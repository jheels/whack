/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                pixel: ['"Press Start 2P"', 'cursive'],
            },
            colors: {
                pixelBackground: '#e3d1bc',
                pixelText: '#403b35',
                pixelBorder: '#6b5243',
                pixelHover: '#e3784d',
            },
        },
    },
    plugins: [],
};
