const fs = require("fs");
const { Collection, WebhookClient } = require("discord.js");

const clients = new Collection();

module.exports = {
  clients: clients
}

const files = fs.readdirSync('./webhooks/clients').filter(file => file.endsWith('.js'));
for(const file of files){
  const client = require(`./clients/${file}`);
  clients.set(client.name, new WebhookClient(client.client, client.secret))
};