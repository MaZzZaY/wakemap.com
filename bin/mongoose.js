var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wakemap');

//Схема для коллекции тегов
var schemaTag = new mongoose.Schema({
    name: String,
    media_count: Number,
    pictures_approved: {type: Number, default: 0},
    pictures_rejected: {type: Number, default: 0},
    pictures_declined_automatically: {type: Number, default: 0}
});

module.exports = {
    Tags : function()
    {
        //создаем модель для Тегов
        var Tag = mongoose.model('Tags', schemaTag);

        //определяем функцию сохранения
        Tag.saveTag = function(tagInfo, callback)
        {
            this.find({name: tagInfo.name}, function(err, tags)
            {
                //если тега нет, то создать его
                if (tags.length == 0)
                {
                    var newTag = new Tag();

                    //присваиваем значения
                    newTag.name = tagInfo.name;
                    newTag.media_count = tagInfo.media_count;

                    //сохраняем
                    newTag.save(function(err, result, numberAffected)
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            callback;
                        }
                    });
                }

            });
        }


        return Tag;
    }
};

