var ig = require('instagram-node').instagram();
ig.use({ client_id: '661c07c94f964b4ebf519c3c28f878d1',
    client_secret: '43fb50e0a7564d33ac60d1cea78ba292' });

module.exports = {
    InstaDriver: function()
    {
        var driver = ig;

        return driver;
    }
};

