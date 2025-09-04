export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatExperience(years: number): string {
  if (years === 1) return "1 год"
  if (years >= 2 && years <= 4) return `${years} года`
  return `${years} лет`
}

export function formatTeachingFormat(format: "online" | "offline" | "both"): string {
  switch (format) {
    case "online":
      return "Онлайн"
    case "offline":
      return "Оффлайн"
    case "both":
      return "Онлайн/Оффлайн"
    default:
      return format
  }
}
