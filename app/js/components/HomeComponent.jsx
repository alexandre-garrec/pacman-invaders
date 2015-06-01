var Router  = require('react-router');
var Link = Router.Link;

var MenuComponent = require('./MenuComponent.jsx');





var HomeComponent = module.exports = React.createClass({
    getInitialState: function() {
        return this.getCurrentState();
    },
    getCurrentState: function (init) {
        var state = {};
        return state;
    },
    render: function() {
        return (
            <div>
                <MenuComponent/>
            </div>
        );
    },

});