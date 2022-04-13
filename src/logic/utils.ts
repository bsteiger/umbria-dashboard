export function calculateApr() {
  console.log("calculateApr not fully implemented.");
  return;
}

/** format to 2 decimals */
export function formatPrice(number: number) {
  return number.toFixed(2);
}

/** Convert Date object to epochTime
 *
 * @param {Date} date
 * @returns {int} epochTime
 */
export function dateToEpochTime(date: Date) {
  return Math.floor(date.getTime() / 1000.0);
}

/**  Returns Date object of current date minus given amounts*/
export function getDateMinus({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
  const now = Date.now();
  return new Date(now - milliseconds({ days, hrs, mins, secs }));
}

/**  Returns Epoch Time of current date minus given amounts*/
export function getEpochMinus({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
  return dateToEpochTime(getDateMinus({ days, hrs, mins, secs }));
}

/** Formats decimal value to percent (0.39 -> 39%) */
export function formatPercent(value: number, decimalPoints = 0) {
  return `${(value * 100).toFixed(decimalPoints)}%`;
}

function milliseconds({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
  return (
    days * 24 * 60 * 60 * 1000 +
    hrs * 60 * 60 * 1000 +
    mins * 60 * 1000 +
    secs * 1000
  );
}

export function convertFromWei(wei: number) {
  return wei * 10 ** -18;
}
