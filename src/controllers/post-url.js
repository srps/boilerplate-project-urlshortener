//import makeShorturl from '../shorturl/index.js';

export default function makePostUrlController({ postUrl }) {
  // We'll get urlInfo from controller
  return async function postUrlController(httpRequest) {
    try {
      const url = await postUrl({ original_url: httpRequest.body });
      return { body: { ...url } };
    } catch (err) {
      throw err
    }
  }
}
