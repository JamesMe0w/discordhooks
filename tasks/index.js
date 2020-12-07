const fs = require("fs");
const cron = require('node-cron');
const webhooks = require('../webhooks');
const resources = require('../resources');
const { Collection } = require("discord.js");

const tasks = new Collection();

module.exports = {
  tasks: tasks
}

const files = fs.readdirSync('./tasks').filter(file => file.endsWith('.js') && file !== 'index.js');
for(const file of files){
  const task = require(`./${file}`);
  tasks.set(task.name, cron.schedule(task.time, function() {
    webhooks.clients.get(task.clientname).send(resources.resources.get(task.resourcename).execute())
  }))
};