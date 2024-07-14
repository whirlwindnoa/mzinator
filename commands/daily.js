module.exports = {
    name: "daily",
    description: "Collect your daily vmim reward",
    async execute(message, args) {
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
            let seconds = 86400 - (time - lastclaim);
            
            let hours = seconds / 3600;
            let minutes = (seconds / 60) - (Math.floor(hours) * 60);
            message.channel.send(`:x: You may claim your reward again in **${Math.floor(hours)} hours, ${Math.floor(minutes)} minutes**.`);
            return;
        }
        let count = Math.floor(Math.random() * 10) + 5;

        db.run(`INSERT OR REPLACE INTO users (id, money, lastclaim) VALUES (?, ?, ?);`, [message.author.id, money + count, time]);

        message.channel.send(`:ballot_box_with_check: **${message.author.username}**, you claimed your **${count}** vmims!`);
        return; 
    }
}