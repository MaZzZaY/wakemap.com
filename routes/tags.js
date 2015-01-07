var express = require('express');
var router = express.Router();


var ig = require('instagram-node').instagram();
ig.use({ client_id: '661c07c94f964b4ebf519c3c28f878d1',
  client_secret: '43fb50e0a7564d33ac60d1cea78ba292' });



ig.tag_media_recent('wakeboard', function(err, result, remaining, limit) {
  router.get('/:name', function(req, res) {
    var tagId = req.param("name")
    res.render('admin_tags', { tagname: tagId });
  });

});



module.exports = router;
