module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    secret: process.env.SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
};
