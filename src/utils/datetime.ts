function zeroPad(num: number, places: number = 2) {
  return String(num).padStart(places, "0");
}

export function printTime(time: number) {
  if (isNaN(time)) time = 0;

  time = Math.floor(time);

  const minutes: number = Math.floor(time / 60);
  const seconds: number = time % 60;

  return `${minutes}:${zeroPad(seconds, 2)}`;
}

export function getDateNumber(text: string) {
  text = text.replaceAll("-", "");

  if (!text) return 0;

  const num = Number(text);

  return isNaN(num) ? 0 : num;
}
