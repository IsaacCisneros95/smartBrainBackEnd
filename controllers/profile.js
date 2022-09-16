const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  return db
    .select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch(() => res.status(400).json("Error getting user"));
};

module.exports = {
  handleProfileGet,
};
