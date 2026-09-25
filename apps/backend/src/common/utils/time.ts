export function toUnixMs(date: Date | null | undefined): number | null {
  if (!date) return null;
  return date.getTime();
}

export function fromUnixMs(ms: number): Date {
  return new Date(ms);
}

export function addSeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}
