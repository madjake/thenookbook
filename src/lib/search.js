const elasticlunr = require('elasticlunr');

class Search {
  constructor(dataAsJSON) {
    this.dataAsJSON = dataAsJSON;
    this.numDocuments = Object.values(this.dataAsJSON).length;

    this.index = elasticlunr(function () {
      this.addField('fullName');
      this.addField('category');
      this.setRef('id');
      //this.saveDocument(false);
    });

    for (const i in this.dataAsJSON) {
      this.index.addDoc(this.dataAsJSON[i]);
    }
  }

  getNumDocuments() {
    return this.numDocuments;
  }

  search(query) {
    const results = this.index.search(query, {});

    let gameItems = [];

    for (let i in results) {
      const id = results[i].ref;
      if (!this.dataAsJSON[id]) {
        continue;
      }
      gameItems.push(this.dataAsJSON[id]);
    }

    return gameItems;
  }
}

module.exports = Search;
