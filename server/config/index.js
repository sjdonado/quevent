module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    secret: process.env.SECRET,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
};
