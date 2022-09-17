const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  const saltRounds = 10;

  if (!email || !name || !password)
    return res.status(400).json("Incorrect form submission");

  const hash = bcrypt.hashSync(password, saltRounds);
  return db
    .transaction((trx) => {
      trx
        .insert({
          hash,
          email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              name,
              email: loginEmail[0].email,
              joined: new Date(),
            })
            .then((user) => res.json(user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((error) => {
      res.status(400).json("Unable to register");
    });
};

module.exports = {
  handleRegister,
};
