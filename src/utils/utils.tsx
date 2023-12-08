
export function formatTime(date: Date): string {
    date = new Date(date);
    return date.toLocaleString('es-AR', { hour12: false, timeStyle: 'short' });
}
