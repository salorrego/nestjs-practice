export function getShortUniqueString(): string {
  const now = new Date();
  // We add this weak random just to cover the case where two test started at the very same millisecond
  const randomNumber = Math.ceil(Math.random() * 99);
  return `${process.pid}${randomNumber}${now.getMilliseconds()}`;
}
