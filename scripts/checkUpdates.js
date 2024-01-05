const fs = require("fs"),
{ logError, logSuccess } = require("./scriptsFn"),
updates = []

let newContent = ""

fs.readFile("./UPDATED.md", "utf8", (err, data) => {
  if(err)
    logError("File UPDATED.md non trovato!")
  else {
    const sections = data.split("#").filter(d => !!d)

    sections.forEach(sec => {
      const subPieces = sec.split("\n").filter(d => !!d).map(p => p.trim()),
      title = subPieces[0],
      list = subPieces.filter((_, i) => i > 0).map(c => c.replace("-", "").trim())

      if(list.length){
        updates.push({
          title,
          list
        })
      }

      newContent += "# " + title + "\n\n"
    })

    if(newContent !== "" && updates.length){
      fs.writeFile("./UPDATED.md", newContent, () => logSuccess("File UPDATED.md aggiornato con successo!"))
      fs.readFile("./package.json", "utf8", (_, packageJson) => {
        const packageJsonData = JSON.parse(packageJson)

        fs.readFile("./public/updates.json", (err, data) => {
          const prevData = err ? [] : JSON.parse(data),
          merge = {
            ...prevData,
            [packageJsonData.version]: {
              date: new Date().toISOString(),
              updates
            }
          }

          fs.writeFile("./build/updates.json", JSON.stringify(merge), () => logSuccess("File build/updates.json aggiornato con successo!"))
          fs.writeFile("./public/updates.json", JSON.stringify(merge), () => logSuccess("File public/updates.json aggiornato con successo!"))
        })
      })
    }
  }
})