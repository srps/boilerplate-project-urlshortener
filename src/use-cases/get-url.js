export default function makeGetUrl({ urlDbAccess }) {
    // Get id from controller
    return async function getUrl({ id }) {
        if(!id) {
            throw new Error('Please provide an Id')
        }
        const { original_url, short_url } = await urlDbAccess.findById({ id });
        return { original_url, short_url };
    }
}