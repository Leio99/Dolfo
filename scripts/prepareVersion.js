const fs = require("fs"),
file = fs.readFile("package.json", "utf8", (_, data) => {
    const package = JSON.parse(data),
    { version } = package,
    pieces = version.split("."),
    lastVersion = Number(pieces[pieces.length - 1]),
    newVersion = lastVersion + 1
    package.version = "1.0." + newVersion
    
    fs.writeFile("package.json", JSON.stringify(package, null, 2), () => console.log("Aggiornata nuova versione!"))
})