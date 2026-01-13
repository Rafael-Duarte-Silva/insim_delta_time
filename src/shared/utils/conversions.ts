import { FULL_CIRCLE } from "shared/constants";

export function speedToKmh(value: number): number {
    const ms = (value * 100) / 32768;
    return Math.floor(ms * 3.6);
}

export function lfsUnitToDegrees(value: number): number {
    return (value * 360) / FULL_CIRCLE;
}

export function normalizeAngle(deg: number): number {
    let a = deg % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
}
