var AdminMenuComponent  = require('./AdminMenuComponent.jsx');

var CategStore   = require('../../stores/CategStore.js');

var DataStore   = require('../../stores/DataStore.js');



var CreateCategComponent = React.createClass({

    render: function() {
        return (
            <div  className="admin">
                <div className="container">
                    <span>Title</span>
                    <input ref="title" type="text"/>
                    <button onClick={this.handleClick} >create</button>
                </div>
                <AdminMenuComponent />
            </div>
        );
    },
     handleClick:function(e){
        //e.preventDefault();
        var title = this.refs.title.getDOMNode().value;

        if (!title) {
            return;
        }

        var categ = {
            title : title,
        }
        CategStore.createCateg(categ);

        this.refs.title.getDOMNode().value = "";
    }


});

module.exports = CreateCategComponent;