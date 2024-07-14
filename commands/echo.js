module.exports = {
    name: "echo",
    description: "debug",
    execute(message, args) {
        message.channel.send(args[2]);
    }
}