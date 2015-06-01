window.React = require('react/addons');

React.initializeTouchEvents(true);

var Home        = require('./components/HomeComponent.jsx');


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
    <DefaultRoute handler={Home} />
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('contenu'));
});