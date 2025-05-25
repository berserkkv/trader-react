export function formatDateTime(dateString) {
  if (!dateString) return "---";

  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  if (year < 2000) return "---";

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  if (isToday) {
    return `${hours}:${minutes}:${seconds}`;
  }

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);

  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
}

export function getPercentage(entryPrice, targetPrice, leverage) {
  if (entryPrice === 0) {
    return 0;
  }
  const percent = ((targetPrice - entryPrice) / entryPrice) * 100 * leverage;
  return percent.toFixed(2);
}