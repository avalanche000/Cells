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

function query(selector) {
    return document.querySelector(selector);
}

export { wrap, clamp, arrayOf, range, JSONCopy, nestedCounter, query };
