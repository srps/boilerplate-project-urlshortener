import makeShorturl from '../shorturl/index.js';

export default function makePostUrl({ urlDbAccess }) {
    // We'll get urlInfo from controller
    return async function postUrl(urlInfo) {
        try {
            const validatedUrl = await makeShorturl(urlInfo);
            const existingUrl = await urlDbAccess.findOne({ original_url: validatedUrl.getOriginalUrl() })
            if(!existingUrl){
                const result = await urlDbAccess.insert({ original_url: validatedUrl.getOriginalUrl() }) 
              return result;
            }
            else {
                return existingUrl;
            }
        }
        catch(err) {
            throw err;
        }
    }
}
