// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this is correct based on your file structure
  ],
  theme: {
    extend: {},
    fontFamily:{
      Poppins: ["Poppins","sans-serif"],
      Nunito: ["Nunito", "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#AF9CF3',
      'upred':'#FF3B3F',
      'cardbg':'#F3F4FA',
      'correct':'#44B77B',
    },
  },
  plugins: [],
}
