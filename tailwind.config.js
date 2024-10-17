/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"STXihei"', "sans-serif"],
      // 你还可以添加其他字体系列
    },
  },
  plugins: [],
};
