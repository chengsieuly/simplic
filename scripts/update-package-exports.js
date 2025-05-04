const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../libs/simplic/src/lib');
const pkgJsonPath = path.resolve(__dirname, '../libs/simplic/package.json');

const pkg = require(pkgJsonPath);

// Base export
const exportsMap = {
  './stylesheets/simplic.css': './stylesheets/simplic.css',
  './stylesheets/date-picker.css': './stylesheets/date-picker.css',
};

// Add each component as a subpath export
const components = fs.readdirSync(componentsDir);
components.forEach((name) => {
  const compPath = path.join(componentsDir, name, 'index.ts');
  if (fs.existsSync(compPath)) {
    exportsMap[`./${name}`] = {
      import: `./es/${name}/index.js`,
      require: `./cjs/${name}/index.js`,
      types: `./types/components/${name}/index.d.ts`,
    };
  }
});

// Write back to package.json
pkg.exports = exportsMap;

fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
console.log('✅ package.json exports updated!');
