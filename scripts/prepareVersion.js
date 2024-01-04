const { logSuccess } = require("./scriptsFn"),
fs = require("fs")

fs.readFile("package.json", "utf8", (_, data) => {
    const packageJson = JSON.parse(data),
    { version } = packageJson,
    pieces = version.split("."),
    lastVersion = Number(pieces[pieces.length - 1]),
    newVersion = lastVersion + 1
    packageJson.version = "1.0." + newVersion
    
    fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), () => logSuccess("Aggiornata nuova versione!"))
})