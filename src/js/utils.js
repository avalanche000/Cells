/**
 * Wraps a value between a min and max where any out-of-bounds number will be added or subtracted by the range until it falls within the boundary [min, max)
 * @param {float} min - the minimum value of the wrap range, the return value can equal this number
 * @param {float} max - the maximum vlaue of the wrap range, the return value may not equal this number
 * @param {float} x - the number to wrap
 * @returns {float} the wrapped number on the range [min, max)
 */
function wrap(min, max, x) {
    const wrapRange = max - min;

    while (x < min) x += wrapRange;
    while (x >= max) x -= wrapRange;

    return x;
}

/**
 * Clamps a value between a min and max where any out-of-bounds number will become either the min or the max depending on which direction it has left the range [min, max]
 * @param {float} min - the minimum value of the clamp range, the return value can equal this number
 * @param {float} max - the maximum vlaue of the clamp range, the return value can equal this number
 * @param {float} x - the number to clamp
 * @returns {float} the clamped number on the range [min, max]
 */
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
/**
 * Returns an ordered array of increasing consecutive integers
 * @param {...int} args - Can either be a single integer which returns the array of [0, args[0]) or it can be two integers that returns the array of [args[0], args[1])
 * @returns {int[]} the array of integers
 */
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

function JSONCopy(data) {
    return JSON.parse(JSON.stringify(data));
}

// function nestedCounter(...args) {
//     const array = [];
//     const counters = arrayOf(args.length, 0);
//     const last = args.length - 1;

//     while (counters[0] < args[0]) {
//         array.push(JSONCopy(counters));

//         counters[last]++;

//         for (let i = last; i >= 0; i--) {
//             if (counters[i] === args[i]) {
//                 counters[i] = 0;

//                 if (i === 0) break;

//                 counters[i - 1]++;
//             } else break;
//         }
//     }

//     return array;
// }

// nests counters with the first being the outer most and the last being the inner most
function nestedCounter(...args) {
    const array = [];
    const length = args.reduce((total, current) => total * current, 1);

    for (let i = 0; i < length; i++) {
        const counters = [];

        let number = i;

        for (let j = args.length - 1; j >= 0; j--) {
            counters.push(number % args[j]);

            number = Math.floor(number / args[j]);
        }

        counters.reverse();

        array.push(counters);
    }

    return array;
}

function offsetSquare(size) {
    return nestedCounter(size * 2 - 1, size * 2 - 1).map(pos => [pos[0] - size + 1, pos[1] - size + 1]);
}

function offsetRing(size) {
    if (size < 1) return [];
    if (size === 1) return [[0, 0]];

    const inner = offsetSquare(size - 1).map(pos => JSON.stringify(pos));

    return offsetSquare(size).filter(pos => !inner.includes(JSON.stringify(pos)));
}

function createOffsetObject(offsetList) {
    const obj = {
        offsetList,
        shift: (dx, dy) => obj.offsetList = obj.offsetList.map(pos => [pos[0] + dx, pos[1] + dy]),
    };

    return obj;
}

function query(selector) {
    return document.querySelector(selector);
}

export { wrap, clamp, arrayOf, range, JSONCopy, nestedCounter, offsetSquare, offsetRing, createOffsetObject, query };
