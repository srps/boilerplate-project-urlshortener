import cryptoRandomString from 'crypto-random-string';

export default function makeUrlDb({ UrlDb }) {
  return Object.freeze({
    findById,
    findOne,
    insert,
  });

  async function findById({ id }) {
    try {
      const url = await UrlDb.findById(id).exec();
      if (!url) { return null }
      return {
        original_url: url.original_url,
        short_url: url._id,
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function findOne({ original_url }) {
    try {
      const url = await UrlDb.findOne({ original_url }).exec();
      if (!url) { return null }
      return {
        original_url,
        short_url: url._id,
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function insert({ original_url }) {

    const generateNewId = async () => {
      let generatedId = '';
      while (!generatedId) {
        let newId = cryptoRandomString({ length: 7, characters: 'alphanumeric' });
        const url = await UrlDb.findById(newId).exec();
        if (!url) { generatedId = newId };
      }
      return generatedId;
    }
    try {
      const _id = await generateNewId();
      const url = new UrlDb({ _id, original_url });
      await url.save();
      return {
        original_url: url.original_url,
        short_url: url._id,
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}