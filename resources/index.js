const fs = require("fs");
const { Collection } = require("discord.js");

const resources = new Collection();

module.exports = {
  resources: resources
}

const files = fs.readdirSync('./resources/content').filter(file => file.endsWith('.js'));
for(const file of files){
  const content = require(`./content/${file}`);
  resources.set(content.name, content)
};