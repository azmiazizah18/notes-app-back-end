const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, Hapi!';
    },
  },
];

module.exports = routes;