module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    secret: process.env.SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  },
  mailer: {
    apiKey: process.env.MAILER_API_KEY,
  },
  database: {
    url: process.env.MONGODB_URI,
  },
};
