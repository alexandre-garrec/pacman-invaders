var Router  = require('react-router');

var Link = Router.Link;

var AdminMenuComponent = React.createClass({
    mixins: [ Router.State  ],
    render: function() {
        return (
            <ul className="menu">
                       <Link activeStyle={{color: 'red'}} to="create"><li>Article</li></Link>
                     <Link activeStyle={{color: 'red'}} to="createCateg"><li>Categorie</li></Link>
            </ul>
        );
    }

});

module.exports = AdminMenuComponent;