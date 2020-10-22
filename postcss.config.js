const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./public/**/*.html",
    "./src/**/*.js",
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],

  safelist: [
    "from-teal-100",
    "to-teal-100",
    "bg-teal-400",
    "from-green-100",
    "to-green-100",
    "bg-green-400",
    "from-yellow-100",
    "to-yellow-100",
    "bg-yellow-400",
    "from-red-100",
    "to-red-100",
    "bg-red-400",
    "from-orange-100",
    "to-orange-100",
    "bg-orange-400",
    "from-blue-100",
    "to-blue-100",
    "bg-blue-400",
    "from-indigo-100",
    "to-indigo-100",
    "bg-indigo-400",
    "from-purple-100",
    "to-purple-100",
    "bg-purple-400",
    "from-pink-100",
    "to-pink-100",
    "bg-pink-400",
  ],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
