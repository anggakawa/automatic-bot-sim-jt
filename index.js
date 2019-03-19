const node_cron = require('cron').CronJob;

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf('daasda');


const screenTaker = require('./screen-taker');

// https://crontab.guru for further preferences
const job = new node_cron('* * * * *', () => {
  console.log('cron job run');
  screenTaker.run().then(() => {
    bot.telegram.sendPhoto(233167004, {
      source: './ss/photo.png'
    });
  });
});

job.start();

bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))
bot.on('message', (ctx) => { 
  ctx.reply(ctx.from.id);
  ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(keyboard))
})
bot.action('delete', ({
  deleteMessage
}) => deleteMessage());

bot.launch();