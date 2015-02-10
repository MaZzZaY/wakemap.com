var express = require('express');
var router = express.Router();

//подключаем прослойку для БД
var db = require('../../../bin/mongoose');

//инициализируем драйвер инстаграмма
var instaEngine = require('../../../bin/instagram');
var ig = instaEngine.InstaDriver();

//считываем параметр name из url
router.get('/:name', function(req, res) {
    var tagId = req.param("name");

    var Tags = db.Tags();


    Tags.findByName(tagId, function(tags)
    {
       res.json(tags);
    });
    /*
    ig.tag(tagId, function(err, result, remaining, limit) {

        var tags = db.Tags();
        //сохраняем
        tags.saveTag(result, function(saveTagResult)
        {
            //возвращаем запись
            res.json(saveTagResult);
        });
    });*/
});


module.exports = router;