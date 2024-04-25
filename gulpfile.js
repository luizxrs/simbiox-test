"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

const postcss = require("gulp-postcss");
const atimport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwind = require("tailwindcss");
const tailwindcss = build.subTask(
  "tailwindcss",
  function (gulp, buildOptions, done) {
    gulp
      .src("assets/tailwind.css")
      .pipe(
        postcss([
          atimport(),
          tailwind("./tailwind.config.js"),
          ...(buildOptions.args.ship
            ? [
                purgecss({
                  content: ["src/**/*.tsx"],
                  defaultExtractor: (content) =>
                    content.match(/[\w-/:]+(?<!:)/g) || [],
                }),
              ]
            : []),
        ])
      )
      .pipe(gulp.dest("assets/dist"));
    done();
  }
);
build.rig.addPreBuildTask(tailwindcss);

const gulp = require("gulp");
const babel = require("gulp-babel");
gulp.task("build", function () {
  const babelCfg = {
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          root: ["./src"],
          alias: { "@": "./src" },
          loglevel: "silent",
        },
      ],
    ],
  };

  return gulp
    .src("src/index.tsx") // Adjust the entry file as per your project
    .pipe(babel(babelCfg)) // Apply babel transformation
    .pipe(gulp.dest("dist/")); // Adjust the output directory as per your project
});

build.initialize(require("gulp"));
