var express = require('express');
var router = express.Router();

//подключаем прослойку для БД
var db = require('../../bin/mongoose');

//создаем переменную для определения параметров возврата
var render = { tagname : ''};

//считываем параметр name из url
router.get('/:name', function(req, res) {
  var tagId = req.param("name");
  render.tagname = tagId;
  var tags = db.Tags();
  tags.findByName(tagId, function(result)
  {
    if (result != null && result.length==1)
    {
      render.tagInfo = result [ 0 ];
    }
    res.render('admin_tags', render);
  });


});



module.exports = router;
