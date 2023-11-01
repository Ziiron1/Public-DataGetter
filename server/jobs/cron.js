const cron = require('cron');

// cria uma nova tarefa cron para executar às 12:00h
const noonUpdate = new cron.CronJob('0 12 * * *', function () {
    updateData();
});

// cria uma nova tarefa cron para executar às 17:00h
const fivePMUpdate = new cron.CronJob('0 17 * * *', function () {
    updateData();
});

// inicia as tarefas cron
noonUpdate.start();
fivePMUpdate.start();
