var Router  = require('react-router');

var Link = Router.Link;

var MenuComponent = React.createClass({

    render: function() {
        return (
            <ul className="MainMenu">
                <li><Link to="game">Jouer</Link></li>
                <li><Link to="score">High score</Link></li>
                <li><Link to="instructions">Instructions</Link></li>
            </ul>
        );
    }

});

module.exports = MenuComponent;