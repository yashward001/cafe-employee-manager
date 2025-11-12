export function daysBetween(start?: Date | null): number {
  if (!start) return 0;
  const ms = Date.now() - new Date(start).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}