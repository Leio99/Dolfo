const ftp = require("basic-ftp"),
readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
}),
client = new ftp.Client()

client.ftp.verbose = true

async function upload(pwd) {
    await client.access({
        host: "ftp.mygraphic.altervista.org",
        port: 21,
        user: "mygraphic",
        password: pwd
    })
    
    await client.ensureDir("components")
    await client.clearWorkingDir()
    await client.uploadFromDir("build", "")

    client.close()
}

readline.question('Insert FTP server password: ', pwd => {
    upload(pwd)
    readline.close()
})