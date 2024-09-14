export function playTime(num: number) {
  num = Math.floor(num);
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
