const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "개발 · 프로그래밍" },
        { name: "게임 개발" },
        { name: "데이터 사이언스" },
        { name: "인공지능" },
        { name: "보안 · 네트워크" },
        { name: "비즈니스 · 마케팅" },
        { name: "하드웨어" },
        { name: "디자인" },
        { name: "학문 · 외국어" },
        { name: "커리어" },
        { name: "자기계발" },
      ],
    })

    console.log("카테고리 데이터를 시드했습니다.")
  }
  catch (error) {
    console.log("카테고리 데이터를 시드하는데 실패했습니다.", error)
  } finally {
    await db.$disconnect()
  }
}

main()
