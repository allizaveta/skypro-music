function zeroPad(num: number, places: number = 2) {
  return String(num).padStart(places, "0");
}

export function printTime(time: number) {
  time = Math.floor(time);

  const minutes: number = Math.floor(time / 60);
  const seconds: number = time % 60;

  return `${minutes}:${zeroPad(seconds, 2)}`;
}
