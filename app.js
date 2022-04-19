const express = require("express");

const {
  addOrUpdateCharacter,
  deleteCharacter,
  getCharacterById,
  getCharacters,
} = require("./dynamo");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const characters = await getCharacterById(id);
    res.json(characters);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;

  try {
    await addOrUpdateCharacter(character);
    res.json({ msg: "Character created successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;

  try {
    await addOrUpdateCharacter(character);
    res.json({ msg: "Character updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCharacter(id);
    res.json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something went wrong" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
