module.exports = {
    name: "balance",
    description: "collect your daily reward...",
    async execute(message, args) {
        let data = await db.get(`SELECT * FROM users WHERE id = ?`, [message.author.id]);

        if (!data) {
            message.channel.send("you have no account, type m!daily to claim your first reward");
            return;
        }

        message.channel.send(`you currently have ${data.money} vmims`);
        return;
    }
}