// public/js/countdown.js
export function calcTimeLeftMs(targetTs) {
    const diff = Math.max(targetTs - Date.now(), 0);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, totalMs: diff };
}

export function formatShort(t) {
    return `${t.days}d ${String(t.hours).padStart(2, "0")}h ${String(t.minutes).padStart(2, "0")}m ${String(t.seconds).padStart(2, "0")}s`;
}

/**
 * initCountdown(options)
 * - selector: CSS selector for elements (default '[data-countdown]')
 * Each element must have attribute: data-target="2026-06-08T00:00:00Z"
 * Optionally: data-format="short" (uses formatShort), or you can style freely.
 */
export function initCountdown(selector = '[data-countdown]') {
    const els = Array.from(document.querySelectorAll(selector)).map(el => {
        const target = el.dataset.target;
        const targetTs = new Date(target).getTime();
        return { el, targetTs };
    });
    if (!els.length) return () => { };

    function updateAll() {
        const now = Date.now();
        els.forEach(({ el, targetTs }) => {
            const t = calcTimeLeftMs(targetTs);
            // If element contains children spans for parts, update them, else set text
            const part = el.querySelector('[data-part="short"]');
            if (part) {
                part.textContent = formatShort(t);
            } else {
                el.textContent = formatShort(t);
            }
            el.setAttribute('data-remaining', String(t.totalMs));
        });
    }

    updateAll();
    const id = setInterval(updateAll, 1000);
    return () => clearInterval(id);
}
