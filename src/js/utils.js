// wraps x between [min, max)
function wrap(min, max, x) {
    const wrapRange = max - min;

    while (x < min) x += wrapRange;
    while (x >= max) x -= wrapRange;

    return x;
}

// clamps x between [min, max]
function clamp(min, max, x) {
    if (x > max) return max;
    if (x < min) return min;
    return x;
}

// returns an array of the specified length filled with the specified value
function arrayOf(length, value) {
    return Array.from({ length }, () => value);
}

// returns an array of integers on [min, max) or [0, max)
function range(...args) {
    let min = 0;
    let max;

    if (args.length === 1) {
        max = args[0];
    } else {
        [min, max] = args;
    }

    const array = [];

    for (let i = min; i < max; i++) array.push(i);

    return array;
}

export { wrap, clamp, arrayOf, range };
