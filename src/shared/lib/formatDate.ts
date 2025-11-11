/**
 * Форматирует дату в читаемый формат
 * @param date - Дата для форматирования (по умолчанию текущая дата)
 * @param locale - Локаль для форматирования (по умолчанию "en-US")
 * @returns Отформатированная строка даты
 */
export function formatDate(
  date: Date = new Date(),
  locale: string = "en-US"
): string {
  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}