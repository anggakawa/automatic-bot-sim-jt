const node_cron = require('cron').CronJob;

// const configureCron = (cronTime, action) => {
//   new node_cron(cronTime, action);
// }

const scheduler = {
  startSchedule(cronTime, action) {
    const job = new node_cron(cronTime, action);
    job.start();
  },
  async cronStop() {
    node_cron.stop();
  }
};

module.exports = scheduler;