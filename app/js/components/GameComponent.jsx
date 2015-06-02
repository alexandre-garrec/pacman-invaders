var GameComponent = React.createClass({
    getInitialState: function() {
        return {
            context : null,

            myLastValue : [ 0 , 450 , 50 , 50 ],

            enemys : [],
            key : null,

            canvasWidth : 500,
            canvasHeight : 500,

            countEnemys : 50,
        }
    },

    render: function() {
        return (
            <div>
                <p>{this.state.countEnemys}</p>
                <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
            </div>
        );
    },

    componentWillMount: function() {
        window.addEventListener("keydown", this._handleKey);
        window.addEventListener("keyup", this._removeKey);

        var enemys = [];

        for (var i = this.state.countEnemys - 1; i >= 0; i--) {
            enemys.push({id : _.uniqueId() , left : _.random(-30, 500) , top :  -_.random(0, 10000) , width :  50 , height :  50});
        };

        this.setState({enemys : enemys });

    },
    componentWillUnmount: function() {
        window.removeEventListener("keydown", this._handleKey);
        window.removeEventListener("keyup", this._removeKey);

    },
    componentDidMount: function() {

        var self = this;
        var canvas = this.refs.canvas.getDOMNode();
        var context = canvas.getContext("2d");

        setInterval(function(){
            context.clearRect(0 , 0 , 500 , 500);
            
            _.map(self.state.enemys , self.moveEnemi );

            self.state.context.fillStyle = "red";

            self.moveMe();


        } , 10 );

        this.setState({ context : context});
      
    },

    moveEnemi : function (enemy , index) {
        if (enemy) {
            var self = this;
        
            var newTop = enemy.top + 1;
            var enemys = this.state.enemys;

            this.state.context.fillStyle = "#000000";

            if (newTop > -40) {
                this.state.context.fillRect(enemy.left , newTop  , enemy.width , enemy.height);
            }

            if (newTop >= 500) {
                _.remove(enemys , function (n){return (n.id == enemy.id)});
            }
            else{
                enemys[index].top = newTop;
            }
            this.setState({countEnemys : enemys.length})
            this.state.enemys  = enemys;
        };
    },

    moveMe : function () {
        var self = this;

        var actionMap = [
          { key : 'Up' , top : -5 , left : 0  },
          { key : 'Down', top : 5 , left : 0  },
          { key : 'Left', top : 0 , left : -5 },
          { key : 'Right', top : 0 , left : 5 },
        ];

        var key =  _.find(actionMap, { key : this.state.key});
        var val = this.state.myLastValue;

        if (key) {

            val[0] += key.left;
            val[1] += key.top;

            if ((val[0] >= 450) ) {
                val[0] = 450;
            }
            else if (val[0] <= 0){
                val[0] = 0;
            }

            if ((val[1] >= 450)) {
                val[1] = 450;
            }
            else if ((val[1] <= 0)) {
                val[1] = 0;
            }
        };

        self.state.context.fillRect(val[0] , val[1] , val[2] ,val[3]);
        this.state.myLastValue = val;

    },

    _removeKey : function () {
        this.setState({ key : null });
    },
    _handleKey: function(event) {
        event.preventDefault();
        this.setState({ key : event.keyIdentifier });
    }

});

module.exports = GameComponent;