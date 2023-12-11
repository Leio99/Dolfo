const fs = require("fs"),
file = fs.readFile("package.json", "utf8", (_, data) => {
    const package = JSON.parse(data)
    delete package.devDependencies
    delete package.scripts
    package.main = "index.js"

    fs.writeFile("dist/package.json", JSON.stringify(package, null, 2), () => console.log("File package.json aggiornato con successo!"))
})