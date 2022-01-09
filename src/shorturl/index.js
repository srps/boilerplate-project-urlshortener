import buildMakeShortUrl from './shorturl.js';
import dns from 'dns';

const validateUrl = (url) => {
  return new Promise((resolve, reject) => {
    const errorMessage = `Invalid URL`;
    try {
      const uri = new URL(url);
      if (!uri || !uri.protocol.match(/(https?)/)) {
        reject(errorMessage);
      } else {
        dns.lookup(uri.hostname, (err, address) => {
          if (err) {
            console.log(`DNS lookup error: ${err}`)
            reject(errorMessage);
          }
          resolve(address);
        });
      }
    } catch (err) {
      if (err.message.match(errorMessage)) {
        reject(errorMessage);
      }
      throw err;
    }
  });
}

const makeShortUrl = buildMakeShortUrl({ validateUrl });

export default makeShortUrl;