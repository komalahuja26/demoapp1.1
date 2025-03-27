var express = require('express');
var router = express.Router();

// Get request for user listing..........
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
