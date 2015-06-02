window.React  = require('react/addons');
window._      = require('lodash');

React.initializeTouchEvents(true);

var Home          = require('./components/HomeComponent.jsx');
var Game          = require('./components/GameComponent.jsx')


var Router        = require('react-router');
var Route         = Router.Route;
var Handler       = Router.RouteHandler;
var DefaultRoute  = Router.DefaultRoute;


var App = React.createClass({
  render: function () {
    return (
      <div>
        <Handler/>
      </div>
    );
  }
});


module.exports = App;

var routes = (
  <Route path="/" handler={App}>
    <Route path="game/" name="game" handler={Game}/>
    <Route path="score/" name="score" handler={Game}/>
    <Route path="instructions/" name="instructions" handler={Game}/>

    <DefaultRoute handler={Home} />
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('contenu'));
});