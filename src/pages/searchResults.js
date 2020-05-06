const searchResultsPage = (req, reply) => {
  const searchQuery = req.params.search_query;

  if (!searchQuery) {
    return reply.code(500).send('Nope');
  }

  //TODO: is valid category name?
  const results = req.searchIndex.search(searchQuery, {
    fields: {
      fullName: 100,
    },
  });

  reply.view('src/templates/index.ejs', {
    totalNumItems: results.length,
    categoryName: searchQuery,
    gameItems: results,
    categories: req.db.categories,
  });
};

module.exports = searchResultsPage;
