import makeUrlDb from './url-db.js';
import { UrlDb } from './Url.js';

const urlDbAccess = makeUrlDb({ UrlDb });

export default urlDbAccess;