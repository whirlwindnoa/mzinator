module.exports = {
    name: "bal",
    description: "collect your daily reward...",
    async execute(message, args) {
        let data = await db.get(`SELECT * FROM users WHERE id = ?`, [message.author.id]);

        if (!data) {
            message.channel.send("");
            return;
        }

        message.channel.send({ embeds: []});
        return;
    }
}