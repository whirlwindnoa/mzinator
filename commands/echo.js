module.exports = {
    name: "echo",
    description: "repeats after you",
    execute(message, args) {
        message.channel.send(args.join(' '));
    }
}