// Mini Sudoku streak shown on the About page: a known count on a known day, plus one per day since.
// Days are counted in UTC so every visitor sees the same number. If the streak ends, remove the block.
const anchor = { days: 438, on: Date.UTC(2026, 10, 12) };
export const streakDays = (now: number = Date.now()): number =>
  anchor.days + Math.max(0, Math.floor((now - anchor.on) / 86_400_000));
