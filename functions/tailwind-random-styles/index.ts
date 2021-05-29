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
    'red', 'blue', 'green', 'indigo', 'yellow', 'gray', '@white'
];

const weights = [
    `100`, `200`, `400`, `600`, `800`,
];

function getRandomColor(colors: string[]): string {
    return shuffleArray(colors).shift();
}

function getRandomTextSize() {
    return `text-${shuffleArray(sizes).shift()}`
}

function getRandomTextColor(colors: string[], weights: string[]) {
    const color = shuffleArray(colors).shift();

    if (color.startsWith('@')) {
        return `text-${color.replace('@', '')}`;
    }

    return `text-${color}-${shuffleArray(weights).shift()}`
}

function getRandomBgColor(colors: string[], weights: string[]) {
    const color = shuffleArray(colors).shift();

    if (color.startsWith('@')) {
        return `bg-${color.replace('@', '')}`;
    }

    return `bg-${color}-${shuffleArray(weights).shift()}`
}

function getRandomCssClasses() {
    let tempColors = colors.slice();
    let tempWeights = weights.slice();

    const textColorCss = getRandomTextColor(tempColors, tempWeights);
    const textWeight = textColorCss.replace(/[^\d]+/g, '');
    const textColor = textColorCss.replace(/^(text|bg)-/, '').replace(/-\d+$/, '');

    // ensure text/bg colors and weights are different
    tempColors.splice(tempColors.findIndex(v => v === textColor || v === `@${textColor}`), 1);
    tempWeights.splice(tempWeights.indexOf(textWeight, 1));

    // if (tempColors.indexOf(textColor) > -1) {

    //     tempColors.splice(tempColors.indexOf(textColor), 1);
    // } else {
    //     tempColors.splice(tempColors.indexOf(`@${textColor}`), 1);
    // }

    return `${getRandomTextSize()} ${textColorCss} ${getRandomBgColor(tempColors, tempWeights)}`;
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
