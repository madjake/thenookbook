const page = (req, reply) => {
  reply.view('src/templates/index.ejs', {
    categoryName: 'Animal Crossing New Horizon Item Database',
    totalNumItems: req.searchIndex.getNumDocuments(),
    categories: req.db.categories,
    gameItems: [],
  });
};

module.exports = page;
