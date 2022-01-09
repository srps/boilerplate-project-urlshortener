export default function makeExpressCallback(controller) {
    return (req, res) => {
      const httpRequest = {
          body: req.body.url,
          params: req.params
      }
      controller(httpRequest)
        .then(({ body }) => {
          req.method === 'GET'
            ? res.redirect(body.original_url)
            : res.json(body)
        })
        .catch(err => {
          console.log(`EC Error:- ${err}`);
          if (err.match('Invalid URL')) {
            res.status(200).send({error: err})
          } else {
            res.status(500).send({error: err})  
          }
        });
      }
}
