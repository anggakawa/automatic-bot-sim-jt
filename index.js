const node_cron = require('cron').CronJob;

const screenTaker = require('./screen-taker');

const job = new node_cron('* * * * *', () => {
  console.log('cron job run');
  screenTaker.run(); 
});

job.start();