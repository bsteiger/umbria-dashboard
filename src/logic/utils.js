/** format to 2 decimals */
export function formatPrice(number) {
	return number.toFixed(2);
}

/** Convert Date object to epochTime
 *
 * @param {Date} date
 * @returns {int} epochTime
 */
export function dateToEpochTime(date) {
	return Math.floor(date.getTime() / 1000.0);
}

/**  Returns Date object of current date minus given amounts*/
export function getDateMinus({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
	const now = new Date();
	return new Date(now - milliseconds({ days, hrs, mins, secs }));
}

/**  Returns Epoch Time of current date minus given amounts*/
export function getEpochMinus({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
	return dateToEpochTime(getDateMinus({ days, hrs, mins, secs }));
}

function milliseconds({ days = 0, hrs = 0, mins = 0, secs = 0 }) {
	return (
		days * 24 * 60 * 60 * 1000 +
		hrs * 60 * 60 * 1000 +
		mins * 60 * 1000 +
		secs * 1000
	);
}
