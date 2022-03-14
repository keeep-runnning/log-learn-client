module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'activate-text': {
          '0%, 33.3%, 100%': { color: 'black' },
          '3.3%, 30.3%': { color: 'transparent' }
        }
      }
    },
  },
  plugins: [],
};
