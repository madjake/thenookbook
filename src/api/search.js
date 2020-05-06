const searchEndpoint = (req, reply) => {
  //TODO sanitize/validate search_query is a reasonable string

  const results = req.searchIndex.search(req.params.search_query, {
    fields: {
      fullName: 100,
    },
  });

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(results);
};

module.exports = searchEndpoint;
