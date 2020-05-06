const path = require('path');
const helmet = require('fastify-helmet');
const DataLoader = require('./lib/data.js');
const Search = require('./lib/search.js');

const notFoundMessages = [
  'Not found.',
  'Nothing here pal.',
  'Yup. This is an empty page.',
  '☢',
  '☣',
];

const errorMessages = ['🔥', '☣'];

const dataLoader = new DataLoader();
const categories = dataLoader.getCategories();
const dataAsJSON = dataLoader.getDataAsJSON();

const searchIndex = new Search(dataAsJSON);

console.log(categories);

const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
  options: {},
});

fastify.register(helmet);

// Decorate requests with search index, etc
fastify.decorateRequest('searchIndex', searchIndex);
fastify.decorateRequest('db', {
  categories: categories,
});

// Serve static files under the public directory
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/static',
});

// PAGES
const indexPage = require('./pages/index');
const searchResultsPage = require('./pages/searchResults');
const categoryResults = require('./pages/categoryResults');

// API
const searchEndpoint = require('./api/search');

// index/front page
fastify.get('/', indexPage);

// Search Results Page
fastify.get('/search/:search_query', searchResultsPage);
fastify.get('/category/:category_name', categoryResults);

// Used by autocomplete dropdown
fastify.get('/api/search/:search_query', searchEndpoint);

fastify.setErrorHandler(function (err, request, reply) {
  console.log(err);
  reply
    .code(500)
    .send(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
});

fastify.setNotFoundHandler(function (request, reply) {
  reply
    .code(404)
    .send(
      notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)],
    );
});

fastify.listen(process.env.PORT || 5000, '0.0.0.0', (err, address) => {
  if (err) {
    throw err;
  }

  fastify.log.info(`Server listening on ${address}`);
});
