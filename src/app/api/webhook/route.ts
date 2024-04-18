import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  }
  catch (error: any) {
    return new NextResponse(`Webhook 오류: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
     return new NextResponse("Webhook 오류: 메타데이터 누락", { status: 400 })
    }

    await db.purchase.create({
      data: {
        userId,
        courseId,
      },
    })
  }
  else {
    return new NextResponse(`Webhook 오류: 알 수 없는 이벤트 ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 })
}
