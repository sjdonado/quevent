db.createUser({
  user: 'quevent_user',
  pwd: 'root_12345',
  roles: [
    {
      role: 'readWrite',
      db: 'quevent',
    },
  ],
});