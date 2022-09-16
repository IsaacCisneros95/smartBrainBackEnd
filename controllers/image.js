const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "016ced89c184442fb44b229246a26c20",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch(() => res.status(400).json("Unable to work with API"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;

  return db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch(() => res.status(400).json("Error updating entries"));
};

module.exports = {
  handleApiCall,
  handleImage,
};
