export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  })

  return formatter.format(price)
}
