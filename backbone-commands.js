(function(_, Backbone){
    
    /**
     * Initialize a subset of commands.
     * 
     * @param {options}
     */
    var Commands = Backbone.Commands = function(options){
        this._commandMap = {};
    };
    
    // Attach all inheritable methods to the Commands prototype.
    _.extend(Commands.prototype, {
        /**
         * @param {string}
         * @param {Backbone.Command}
         */
        bind: function(name, command){
            if (!typeof command == 'object' || typeof command.execute == 'function'){
                throw 'invalid command';
            }
            this._commandMap[name] = command;
        },
        
        /**
         * @param {string}
         */
        unbind: function(name){
            delete this._commandMap[name];
        },
        
        /**
         * @param {string}
         */
        willTrigger: function(name){
            return this._commandMap[name] || false;
        },
        
        /**
         * @param {string}
         */
        trigger: function(name){
            var args = Array.prototype.slice.call(arguments, 1);
            var commandClass = this._commandMap[name] || null;
            
            if (command !== null){
                var command = new commandClass();
                command.execute.apply(null, args);
            }
        },
        
    });
    
    var Command = Backbone.Command = function(){};
    
    _.extend(Command.prototype, {
        execute: function(){}
    });
    
    // Set up inheritance for the commands.
    Backbone.Commands.extend = Backbone.Command.extend = Backbone.Model.extend;
    
})(_, Backbone);
