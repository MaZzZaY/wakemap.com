var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wakemap');

var Schema = mongoose.Schema;

//Схема для коллекции тегов
var schemaTag = new mongoose.Schema({
    _id: String,
    name: String,
    media_count: Number,
    pictures_approved: {type: Number, default: 0},
    pictures_rejected: {type: Number, default: 0},
    pictures_declined_automatically: {type: Number, default: 0},
    pictures_downloaded: {type: Number, default: 0}
});

//Схема для коллекции тегов
var schemaMedia = new mongoose.Schema({
    //attribution: String,
    tags: [], //список тегов
    location: //данные о геопозиции
    {
        id: String,
        name: String,
        latitude: Number,
        longitude: Number
    },
    //comments: //комментарии
    //{
    //    count: Number,
    //    data: Schema.Types.Mixed
    //},
    //filter: String, //Фильтры, наложенные на фото
    created_time: Date, //Дата создания
    link: String, //ссылка на фото
    likes: //лайки
    {
        count: Number,
        data: Schema.Types.Mixed
    },
    images: //ссылки на изображение
    {
        low_resolution: Schema.Types.Mixed,
        thumbnail: Schema.Types.Mixed,
        standard_resolution: Schema.Types.Mixed
    },
    //users_in_photo: [], //пользователи, отмеченные на фото
    caption: //данные из шапки
    {
        created_time: Date,
        text: String,
        from: Schema.Types.Mixed,
        id: String
    },
    type: String,
    id: String,
    user:
    {
        username: String,
        website: String,
        profile_picture: String,
        full_name: String,
        bio: String,
        id: String
    },

    approved: {type: Number, default: 0} //0 - не рассмотренно / 1 - согласовано / 2 - отклонено / 5 - отклонено автоматически
});

module.exports = {
    Tags : function()
    {
        //создаем модель для Тегов
        var Tag = mongoose.model('Tags', schemaTag);

        //определяем функцию поиска по имени
        Tag.findByName = function(name, callback)
        {

            var regex = new RegExp(["^",name,"$"].join(""),"i");

            this.find({name: regex}, function(err, tags)
            {
                callback(tags);
            });

        }

        //определяем функцию сохранения
        Tag.saveTag = function(tagInfo, callback)
        {
            Tag.findOneAndUpdate({name: tagInfo.name}, tagInfo, {upsert: true}, function(err, tags)
            {
                //console.log(err);
                callback(tags);
            });
        }




        return Tag;
    },

    Media : function()
    {
        //создаем модель для картинов
        var Media = mongoose.model('Media', schemaMedia);



        //определяем функцию сохранения
        Media.saveMedia = function(mediaInfo, callback)
        {
            Media.findOneAndUpdate({id: mediaInfo.id}, mediaInfo, {upsert: true}, function(err, medias)
            {
                //console.log(err);
                callback(medias);
            });
        }


        return Media;
    }
};

