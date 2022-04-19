const axios = require("axios");

const { addOrUpdateCharacter } = require("./dynamo");

const getData = async () => {
  const url = "https://hp-api.herokuapp.com/api/characters";

  try {
    const { data: characters } = await axios.get(url); //res.data

    const characterPromises = characters.map(
      (character, i) => addOrUpdateCharacter({ ...character, id: i + "" }) //()=>{} if {} is not used implicit return
    );

    await Promise.all(characterPromises);
  } catch (error) {
    console.log(error);
  }
};

getData();
