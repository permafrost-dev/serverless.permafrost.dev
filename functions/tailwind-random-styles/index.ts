import { Handler } from "@netlify/functions";
import { sizes, colors, weights } from './tailwind';
import { randomInt, randomElement } from './../shared/helpers';

/**
 * This function is used in an attempt to make sure that dark text => light bg and vice verse.
 *
 * @param weight
 * @param weights
 * @returns
 */
function getAlternateWeight(weight: number, weights: number[]): number {
    weights = weights.sort();
    let index = weights.indexOf(weight);

    if (index === weights.length - 1) {
        weights = weights.reverse();
        index = 0;
    }

    return weights[index + randomInt(2, weights.length - 1)]
        || weights[index - randomInt(2, weights.length - 1)]
        || weights[index - 2]
        || weights[index + 2]
        || randomElement(weights);
}

class RandomCss {
    static textSize() {
        return `text-${randomElement(sizes)}`
    }

    static colorFor(type: 'text' | 'bg', colors: string[], weights: number[], otherWeight: number | null = null) {
        const color = randomElement(colors);

        if (color.startsWith('@')) {
            return `${type}-${color.slice(1)}`;
        }

        const weight = otherWeight
            ? getAlternateWeight(otherWeight, weights)
            : randomElement(weights);

        return `${type}-${color}-${weight}`
    }

    static textColor(colors: string[], weights: number[]) {
        return this.colorFor('text', colors, weights);
    }

    static bgColor(colors: string[], weights: number[], textWeight: number) {
        return this.colorFor('bg', colors, weights, textWeight);
    }

    static classes() {
        let tempColors = colors.slice();
        let tempWeights = weights.slice();

        const textColorCss = this.textColor(tempColors, tempWeights);
        const textWeight = Number(textColorCss.replace(/[^\d]+/g, '').padStart(1, '0'));
        const textColor = textColorCss.replace(/^(text|bg)-/, '').replace(/-\d+$/, '');

        // ensure text/bg colors and weights are different
        tempColors.splice(tempColors.findIndex(v => v.replace('@', '') === textColor), 1);
        tempWeights.splice(tempWeights.indexOf(textWeight, 1));

        return [
            this.textSize(),
            textColorCss,
            this.bgColor(tempColors, weights, textWeight),
        ].join(' ');
    }
}

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({ classes: RandomCss.classes() }),
  };
};

export { handler };
