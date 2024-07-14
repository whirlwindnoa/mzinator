module.exports = {
    name: "bal",
    description: "View balance of yourself or someone else",
    async execute(message, args) {
        let userId;
        let self = true;
        if (args[0]) {
            userId = args[0].toString();
            self = false;
        }
        else userId = message.author.id;

        let guildMember;
        guildMember = await message.guild.members.fetch(userId)
        .catch(async () => {
            guildMember = await message.guild.members.fetch({ query: args[0].toString(), limit: 1 })
            .catch((err) => {
                console.log(err);
            })
            return;
        });

        let user = guildMember.user;
        console.log(guildMember.user);

        let data = await db.get(`SELECT * FROM users WHERE id = ?`, [user.id]);

        if (!data && self) {
            message.channel.send(":x: Claim your first reward with m!daily before checking balance!");
            return;
        }
        else if (!data && !self) {
            message.channel.send(":x: Mentioned user does not have a balance.");
            return; 
        }

        let text;
        if (self) text = `You currently have ${data.money} vmim`;
        else text = `<@${user.id}> currently has ${data.money} vmim`;

        message.channel.send({ embeds: [simpleEmbed('Balance', user, text) ]});
        return;
    }
}