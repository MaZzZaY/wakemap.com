var express = require('express');
var router = express.Router();


var ig = require('instagram-node').instagram();
ig.use({ client_id: '661c07c94f964b4ebf519c3c28f878d1',
  client_secret: '43fb50e0a7564d33ac60d1cea78ba292' });

ig.tag_media_recent('wakeboard', function(err, result, remaining, limit) {
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { title: JSON.stringify(result) });
  });

});



module.exports = router;
