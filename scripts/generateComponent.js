const { logError, logSuccess } = require("./scriptsFn"),
fs = require("fs"),
args = process.argv.slice(2),
currentDir = process.env.INIT_CWD,
tsTemplates = ["interface", "class"]

if(args.length === 0)
    logError("Nome del componente non inserito!")
else{
    const componentName = args[0]

    if(componentName.trim() === "")
        logError("Nome del componente vuoto!")
    else{
        const template = args.length > 1 && args[1].trim() !== "" && !args[1].startsWith("--") ? args[1].toLowerCase() : "default",
        isPure = args.includes("--pure"),
        templateDir = __dirname + "\\templates/" + template + ".template",
        reactComponent = isPure ? "PureComponent" : "Component",
        cName = componentName[0].toUpperCase() + componentName.substring(1, componentName.length),
        extension = tsTemplates.includes(template) ? "ts" : "tsx"
        
        fs.readFile(templateDir, "utf8", (err, data) => {
            if(err)
                logError("Template non esistente!")
            else{
                data = data.replace("<className>", cName)
                data = data.replace("<reactComponent>", reactComponent)

                const newDir = `${currentDir}/${componentName}.${extension}`

                fs.readFile(newDir, "utf8", (_, data2) => {
                    if(!data2)
                        fs.writeFile(newDir, data, () => logSuccess("File generato con successo!"))
                })
            }
        })
    }
}