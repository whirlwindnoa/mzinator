module.exports = {
    name: "daily",
    description: "collect your daily reward...",
    async execute(message, args) {
        let count = Math.floor(Math.random() * 10) + 5;
        let time = Math.floor(Date.now() / 1000);

        let data = await db.get(`SELECT * FROM users WHERE id = ?`, [message.author.id]);

        let money, lastclaim;

        if (!data) {
            money = 0;
            lastclaim = 86401;
        }
        else {
            money = data.money;
            lastclaim = data.lastclaim;
        }
        if ((time - lastclaim) < 86400) {
            let timeToClaim = 23 - Math.floor((time - lastclaim)/3600);
            message.channel.send(`you may claim your reward again in ${timeToClaim} hours.`);
            return;
        }
        db.run(`INSERT OR REPLACE INTO users (id, money, lastclaim) VALUES (?, ?, ?);`, [message.author.id, money + count, time]);

        message.channel.send(`${message.author.username}, you claimed your ${count} vmims!`);
        return; 
    }
}