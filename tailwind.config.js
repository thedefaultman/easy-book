/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0F62FE",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
