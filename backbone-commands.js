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
        bind: function(name, commandClass){
            if (!typeof commandClass == 'object' || typeof commandClass.execute == 'function'){
                throw 'invalid command';
            }
            this._commandMap[name] = commandClass;
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
                command.execute.apply(command, args);
            }
        }
        
    });
    
    /**
     * Initialize a Command.
     */
    var Command = Backbone.Command = function(){};
    
    // Attach all inheritable methods to the Command prototype.
    _.extend(Command.prototype, {
        execute: function(){}
    });
    
    // Set up initialize for Command.
    Backbone.Command.extend = Backbone.Model.extend;
    
    /**
     * Initialize a MacroCommand.
     */
    var MacroCommand = Backbone.MacroCommand = function(){
        this._subCommands = [];
        
        this.initialize.apply(this, arguments);
    };
    
    // Attach all inheritable methods to the MacroCommand prototype.
    _.extend(MacroCommand.prototype, {
        /**
         * Initialize the MacroCommand by adding the sub commands.
         */
        initialize: function(){},
        
        /**
         * Execute all sub commands in added order.
         */
        execute: function(){
            while (this._subCommands.length){
                var command = new (this._subCommands.shift());
                command.execute.apply(command, arguments);
            }
        },
        
        /**
         * @param {Backbone.Command}
         */
        addSubCommand: function(commandClass){
            this._subCommands.push(commandClass);
        }
    });
    
    // Set up inheritance for Backbone.MacroCommand.
    Backbone.MacroCommand.extend = Backbone.Model.extend;
    
})(_, Backbone);
