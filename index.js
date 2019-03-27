global.__basedir = __dirname;

require('dotenv').config();

const subscriber = require('./core/subscriber');
const scheduler = require('./core/scheduler');
const screenTaker = require('./core/screen-taker');

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// ubah waktu scheduler sesuai kebutuhan bisnis
scheduler.startSchedule('* * * * *', () => {
  // check apakah berjalan lancar atau tidak;

  (async function taskRunner(){
    const getSS = await screenTaker.run();
    if (getSS) {
      const subscriberArray = subscriber.getAllSubscriber();
      subscriberArray.then((data) => {
        data.forEach(element => {
          bot.telegram.sendPhoto(element.telegram_id, {
            source: __dirname + '/ss/photo.png'
          });
        });
      });
    }
  })();

})

bot.start((ctx) => ctx.reply('Hello'));
bot.help((ctx) => ctx.reply('help template'));
bot.command('subscribe', (ctx) => {
  subscriber.addSubscriber(ctx.message.chat.id).then(() => {
    ctx.reply('anda telah menjadi subscriber');
  });
});
bot.command('unsubscribe', (ctx) => {
  subscriber.unsubscribe(ctx.message.chat.id).then(() => {
    ctx.reply('id anda telah dihapus');
  })
});

// for development purpose
// bot.command('send', (ctx) => {
//   subscriber.getAllSubscriber().then((data) => {
//     ctx.telegram.sendPhoto(data[0].telegram_id, {
//       source: './ss/photo.png'
//     });
//   })
// });
// bot.action('delete', ({
//   deleteMessage
// }) => deleteMessage());

bot.launch();