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
        if(err === "Invalid URL") {
          res.status(200).send({error: err})
        }
        res.status(500).send({error: err})
        });
      }
}

/*
        req.method === 'GET' 
          ? controller(httpRequest).then(({ body }) => { res.redirect(body.original_url) }).catch(sendErrorResponse)
          : controller(urlInfo).then(({ body }) => { res.json(body) })
            .catch(sendErrorResponse)
    }
*/
