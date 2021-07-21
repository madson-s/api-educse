export default {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTHUSER,
    pass: process.env.EMAIL_AUTHPASS,
  },
  default: {
    from: 'Equipe Educse <noreply@educse.com>',
  },
};
