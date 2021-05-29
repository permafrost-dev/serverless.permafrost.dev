import { Handler } from "@netlify/functions";

function shuffleArray(arr) {
    let result = arr.slice();

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

const sizes = [
    'xs', 'sm', 'normal', 'lg', 'xl',
];

const colors = [
    'red', 'blue', 'green', 'indigo', 'yellow',
];

const weights = [
    200, 400, 600, 800,
];

function getRandomTextSize() {
    return `text-${shuffleArray(sizes).shift()}`
}

function getRandomTextColor() {
    return `text-${shuffleArray(colors).shift()}-${shuffleArray(weights).shift()}`
}

function getRandomBgColor() {
    return `bg-${shuffleArray(colors).shift()}-${shuffleArray(weights).shift()}`
}

function getRandomCssClasses() {
    return `${getRandomTextSize()} ${getRandomTextColor()} ${getRandomBgColor()}`;
}

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({ classes: getRandomCssClasses() }),
  };
};

export { handler };
