export const randomInt = (min = 0, max = 50) => Math.round(Math.random() * (max - min) + min);

export function shuffleArray(arr): any[] {
    const result = arr.slice();

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export function randomElement<T>(arr: T[]): T {
    return shuffleArray(arr).shift();
}

export const min = (a: number, b: number) => (a < b ? a : b);
