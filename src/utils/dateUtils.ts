export function getDaysInMonth(year: number, month: number): Date[] {
	const date = new Date(year, month, 1);
	const days: Date[] = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
}

export function getMonthData(date: Date): Date[] {
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	const daysInMonth = getDaysInMonth(year, month);
	const daysInPrevMonth = getDaysInMonth(year, month - 1);
	const daysInNextMonth = getDaysInMonth(year, month + 1);

	const startPadding = firstDay.getDay();
	const endPadding = 6 - lastDay.getDay();

	const prevMonthDays = daysInPrevMonth.slice(-startPadding);
	const nextMonthDays = daysInNextMonth.slice(0, endPadding);

	return [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
}

export function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}
