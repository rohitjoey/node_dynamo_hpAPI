const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "harrypotterapi";

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const characters = await dynamoClient.scan(params).promise();
    // console.log(characters);
    return characters;
  } catch (error) {
    console.log(error);
  }
};

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };

  return await dynamoClient.put(params).promise();
};

const getCharacterById = async (characterId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: characterId,
    },
  };

  const character = await dynamoClient.get(params).promise();

  // console.log(character);
  return character;
};

const deleteCharacter = async (characterId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: characterId,
    },
  };

  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter,
};
