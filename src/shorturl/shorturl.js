export default function buildMakeShortUrl({ validateUrl }) {
  return async function makeShortUrl({original_url, short_url}) {
    try {
      await validateUrl(original_url);
    } catch (err) {
      console.log(`Dependency error: ${err}`);
      throw err;
    }
    return Object.freeze({
      getOriginalUrl: () => original_url,
      getShortUrl: () => short_url
    });
  }
}