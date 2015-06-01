var AdminMenuComponent  = require('./AdminMenuComponent.jsx');

var CategStore   = require('../../stores/CategStore.js');

var DataStore   = require('../../stores/DataStore.js');

var request = require('superagent');
var fs =      require('fs');



var CreateArticleComponent = React.createClass({

 render: function() {
        console.log("yooloo");
        return (
            <div  className="admin">
                <div className="container">
               
                    <span>Image</span>
                    <input type="file" ref="image" />
                    <output id="list"></output>
                    <span>Title</span>
                    <input ref="title" type="text"/>
                    <span>Contenue</span>
                    <br/>
                    <textarea id="editor1" rows="10" cols="80"></textarea>
                    <br/>
                    <select ref="type">
                        {CategStore.getData().map(function(item){
                            return (<option value={item.id}>{item.name}</option>);
                        })}
                    </select>
                    <br/>
                    <br/>
                    
                    <button onClick={this.handleClick} >create</button>
                </div>
                 <AdminMenuComponent />
            </div>
        );
    },

    componentDidMount: function() {
          CKEDITOR.replace( 'editor1' );

        CategStore.on(CategStore.Events.CHANGE, this._onDataChange);
    },
    componentWillUnmount: function() {
        CategStore.removeListener(CategStore.Events.CHANGE, this._onDataChange);
    },
     _onDataChange: function () {
        this.forceUpdate();
    },
    handleClick:function(e){
        var self = this;
        //e.preventDefault();
        var image = this.refs.image.getDOMNode().files[0];
        var title = this.refs.title.getDOMNode().value;
        var type = this.refs.type.getDOMNode().value;
        var htmldata = CKEDITOR.instances.editor1.getData();
        

        if (!title && !htmldata && !type) {
            return;
        }
         request
            .post('http://localhost:1337/file/upload')
            .attach('uploadFile', image , image.name)
            .end(function(err , resp){
                var tabImg = resp.body.file[0].fd.split('/');

                  var article = {
                    title : title,
                    contents :htmldata,
                    type : type,
                    image: tabImg[(tabImg.length - 1)]
                }

                DataStore.createData(article);

                self.refs.image.getDOMNode().value = "";
                self.refs.title.getDOMNode().value = "";
                CKEDITOR.instances.editor1.setData(""); 
            });
    }


});

module.exports = CreateArticleComponent;