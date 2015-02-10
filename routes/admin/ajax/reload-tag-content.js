var express = require('express');
var router = express.Router();

//подключаем прослойку для БД
var db = require('../../../bin/mongoose');

//инициализируем драйвер инстаграмма
var instaEngine = require('../../../bin/instagram');
var ig = instaEngine.InstaDriver();


var counter = 0;

//считываем параметр name из url
router.get('/:name', function(req, res) {
    var tagId = req.param("name");
    ig.tag_media_recent(tagId, function getRecent(err, result, pagination, remaining, limit) {

        if (err != null)
        {
            console.log(err);
            err.retry(getRecent);
            return;
        }

        var media = db.Media();

        if (counter < 100000)
        {
            for (var i = 0; i < result.length; i++) {
                media.saveMedia(result[ i ], function (saveMediaResult) {
                    counter++;
                    console.log("counter: " + counter);

                });
            }

            if (pagination.next)
            {
                pagination.next(getRecent);
            }
        }

    });

    res.write("123");
    res.send();
});


module.exports = router;