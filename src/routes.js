const { Router } = require('express');

const routes = new Router();

routes.get(`/`, async (req, res) => {
  res.send('Hello Bexs');
});

module.exports = routes;
