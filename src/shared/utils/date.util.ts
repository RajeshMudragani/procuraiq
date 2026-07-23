export class DateUtil {
    static toDateOnly(
        date: Date,
    ): string {
        return date
        .toISOString()
        .split('T')[0];
    }

    static toIsoString(
        date: Date,
    ): string {
        return date.toISOString();
    }

    static toLocalDateTime(
        date: Date,
    ): string {
        const pad = (value: number) =>
        String(value).padStart(2, '0');

        return (
        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())} ` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}:` +
        `${pad(date.getSeconds())}`
        );
    }
}