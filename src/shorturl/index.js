import buildMakeShortUrl from './shorturl.js';
import dns from 'dns';

const validateUrl = (url) => {
  return new Promise((resolve, reject) => {
    const uri = new URL(url);
    const errorMessage = `Invalid URL`;
    if (!uri || !uri.protocol.match(/(https?)/) ) {
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
  });
}

const makeShortUrl = buildMakeShortUrl({ validateUrl });

export default makeShortUrl;