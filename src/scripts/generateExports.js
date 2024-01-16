const fs = require("fs");
const path = require("path");
// todo: add a check for default export. this will help generate * for non-default exports
function generateExports(dir, isDefaultExport = true) {
  const files = fs.readdirSync(dir);
  const exports = files
    .filter((item) => !item.includes("index"))
    .map((file) => {
      const basename = path.basename(file, path.extname(file));
      if (file.includes(".tsp")) {
        return `export { default as ${basename} } from "./${basename}";`;
      } else {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          generateExports(filePath);
        }
        return `export * from "./${basename}";`;
      }
    });
  const exportStatements = exports.join("\n");
  fs.writeFileSync(path.join(dir, "index.ts"), exportStatements);
}

console.log(generateExports("../types"));
