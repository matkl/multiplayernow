const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const config = require('../config');

const transporter = nodemailer.createTransport(smtpTransport({ ignoreTLS: true }));

/**
 * GET /add-game
 */
exports.get = (req, res) => {
  res.render('add-game', {
    title: 'Add Game',
    header: false,
  });
};

/**
 * POST /add-game
 */
exports.post = (req, res, next) => {
  const error = err => next(new Error(err));
  const ok = data => res.send(data);

  if (!req.body.task) return error('wrong answer');
  if (parseInt(req.body.task.trim(), 10) !== 8) return error('wrong answer');

  const { url } = req.body;

  if (req.app.get('env') === 'development') {
    console.log('Add game', url); // eslint-disable-line no-console
  }

  if (req.app.get('env') === 'production') {
    transporter.sendMail({
      from: config.from,
      to: config.admin,
      subject: `Add Game ${url}`,
    }, (err) => {
      if (err) return next(err);
      ok({ url });
    });
    return;
  }

  ok({ url });
};
