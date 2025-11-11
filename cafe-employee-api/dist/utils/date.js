"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysBetween = daysBetween;
function daysBetween(start) {
    if (!start)
        return 0;
    const ms = Date.now() - new Date(start).getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}
