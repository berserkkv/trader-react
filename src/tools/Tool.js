export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  if (year < 2000) return "---";

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);


  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
}
