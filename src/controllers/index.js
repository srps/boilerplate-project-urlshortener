import makePostUrl from "../use-cases/post-url.js";
import makeGetUrl from "../use-cases/get-url.js";
import makeGetUrlController from './get-url.js'
import makePostUrlController from './post-url.js'

import urlDbAccess from "../data-access/index.js";

const postUrl = makePostUrl({ urlDbAccess });
const getUrl = makeGetUrl({ urlDbAccess });
const getUrlController = makeGetUrlController({ getUrl });
const postUrlController = makePostUrlController({ postUrl });


const urlServices = Object.freeze({
    postUrlController,
    getUrlController
})

export default urlServices
export { postUrlController, getUrlController }