/**
 * generates a list of classes to add to the tailwindcss purge safelist.
 *
 */
const { sizes, colors, weights } = require('./tailwind');

colors.splice(colors.indexOf('@white'), 1);

const all = ['text-white', 'bg-white'];

colors.forEach(color => {
    weights.forEach(weight => {
        all.push(`text-${color}-${weight}`);
    });
    weights.forEach(weight => {
        all.push(`bg-${color}-${weight}`);
    });
});

sizes.forEach(size => {
    all.push(`text-${size}`);
});

console.log(all.sort());
