const fs = require("fs"),
{ logSuccess } = require("./scriptsFn")

fs.readFile("package.json", "utf8", (_, data) => {
    const packageJson = JSON.parse(data)
    delete packageJson.devDependencies
    delete packageJson.scripts
    packageJson.main = "index.js"

    fs.writeFile("dist/package.json", JSON.stringify(packageJson, null, 2), () => logSuccess("File package.json aggiornato con successo!"))
})