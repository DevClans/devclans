const babel = require("@babel/core");
const fs = require("fs");

function hasDefaultExport(file) {
  const code = fs.readFileSync(file, "utf-8");
  const ast = babel.parseSync(code);
  return ast.program.body.some(
    (node) => node.type === "ExportDefaultDeclaration"
  );
}

console.log(hasDefaultExport("../components/SearchBar.tsx")); // replace with your file path
