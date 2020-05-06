const categoryResults = (req, reply) => {
  const categoryName = req.params.category_name;

  if (!categoryName) {
    return reply.code(500).send('Nope');
  }

  //TODO: is valid category name?
  const results = req.searchIndex.search(categoryName, {
    fields: {
      category: 100,
    },
  });

  reply.view('src/templates/index.ejs', {
    totalNumItems: results.length,
    categoryName: categoryName,
    gameItems: results,
    categories: req.db.categories,
  });
};

module.exports = categoryResults;
