/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {


        papalingo: {
          ...require("daisyui/src/theming/themes")["fantasy"],
          primary: "#0d5a6f",
        },


      }
    ],
  },
}

