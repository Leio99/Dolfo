const ftp = require("basic-ftp"),
Writable = require("stream").Writable,
client = new ftp.Client(),
mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        if(!this.muted)
            process.stdout.write(chunk, encoding)

        callback()
    }
}),
readline = require("readline").createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
})

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

mutableStdout.muted = false

readline.question("Insert FTP server password: ", pwd => {
    upload(pwd)
    readline.close()
})

mutableStdout.muted = true