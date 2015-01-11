var express = require('express');
var router = express.Router();

//подключаем прослойку для БД
var db = require('../../../bin/mongoose');

//инициализируем драйвер инстаграмма
var ig = require('instagram-node').instagram();
ig.use({ client_id: '661c07c94f964b4ebf519c3c28f878d1',
    client_secret: '43fb50e0a7564d33ac60d1cea78ba292' });

//считываем параметр name из url
router.get('/:name', function(req, res) {
    var tagId = req.param("name");
    ig.tag(tagId, function(err, result, remaining, limit) {
        res.json(result);
        var tags = db.Tags();
        tags.saveTag(result, err);
    });
});



module.exports = router;