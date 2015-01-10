var express = require('express');
var router = express.Router();

//инициализируем драйвер инстаграмма
var ig = require('instagram-node').instagram();
ig.use({ client_id: '661c07c94f964b4ebf519c3c28f878d1',
  client_secret: '43fb50e0a7564d33ac60d1cea78ba292' });

//создаем переменную для определения параметров возврата
var render = { tagname : ''};

//считываем параметр name из url
router.get('/:name', function(req, res) {
  var tagId = req.param("name");
  render.tagname = tagId;
  ig.tag_media_recent('tagId', function(err, result, remaining, limit) {
    res.render('admin_tags', render);
  });
});



module.exports = router;
