var UserStore   = require('../../stores/UserStore.js');
var DataStore   = require('../../stores/DataStore.js');

var AdminMenuComponent  = require('./AdminMenuComponent.jsx');
var AdminComponent = React.createClass({

    render: function() {
        return (
            <div className="admin">

                <div className="container">Bonjour  {UserStore.getUser().pseudo}</div>

                <AdminMenuComponent />
            </div>
        );
    },

});


module.exports = AdminComponent;