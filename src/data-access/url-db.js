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
    const url = new UrlDb({ original_url });
    url.save()
      .then(({ original_url }) => { original_url })
      .catch(err => { throw new Error(err) });
    return {
      original_url: url.original_url,
      short_url: url._id,
    }
  }
}