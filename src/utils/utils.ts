/* Modified from https://stackoverflow.com/a/29816921/4600224 */
export function msTimeFormat(ms: number): string {
  let seconds = ms / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  const fHours = (hours < 10) ? `0${hours}` : `${hours}`;
  const fMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
  const fSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

  return `${fHours}:${fMinutes}:${fSeconds}`;
}
