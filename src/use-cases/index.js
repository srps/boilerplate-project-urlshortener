import makePostUrl from "./post-url.js";
import makeGetUrl from "./get-url.js"

import urlDbAccess from "../data-access/index.js";

const postUrl = makePostUrl({ urlDbAccess });
const getUrl = makeGetUrl({ urlDbAccess })

const urlServices = Object.freeze({
    postUrl,
    getUrl
})

export default urlServices
export { postUrl, getUrl }