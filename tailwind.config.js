/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hobbithole': "url(../public/img/lotr-background.jpg)",
        'fire': "url(../public/img/fire.gif)",
      }
    },
  },
  plugins: [],
}
