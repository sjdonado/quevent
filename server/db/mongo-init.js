db.createUser({
  user: 'user',
  pwd: 'user_12345',
  roles: [
    {
      role: 'readWrite',
      db: 'database_example',
    },
  ],
});