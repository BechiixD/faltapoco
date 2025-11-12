export type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
};

export function calcTimeLeft(target: string | number | Date): TimeLeft {
    const ts = target instanceof Date ? target.getTime() : new Date(target).getTime();
    const diff = Math.max(ts - Date.now(), 0);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, totalMs: diff };
}
