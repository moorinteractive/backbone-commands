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
         * @param {Backbone.Command|Backbone.MacroCommand|Backbone.ASyncCommand|Backbone.ASyncMacroCommand}
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
         * @param {Backbone.Command|Backbone.MacroCommand|Backbone.ASyncCommand|Backbone.ASyncMacroCommand}
         */
        addSubCommand: function(commandClass){
            this._subCommands.push(commandClass);
        }
    });
    
    // Set up inheritance for Backbone.MacroCommand.
    Backbone.MacroCommand.extend = Backbone.Model.extend;
    
    /**
     * Initialize a ASyncCommand.
     */
    var ASyncCommand = Backbone.ASyncCommand = function(){
        this.onComplete = null;
    };
    
    // Attach all inheritable methods to the ASyncCommand prototype.
    _.extend(ASyncCommand.prototype, {
        /**
         * Execyte the async command.
         */
        execute: function(){},
        
        /**
         * Mark the command as completed, used for async execution of commands.
         */
        completeCommand: function(){
            if (this.onComplete !== null && typeof this.onComplete == 'function'){
                this.onComplete.apply(this.onCompleteContext);
            }
        }
    });
    
    // Set up initialize for ASyncCommand.
    Backbone.ASyncCommand.extend = Backbone.Model.extend;
    
    /**
     * Initialize a ASyncMacroCommand.
     */
    var ASyncMacroCommand = Backbone.ASyncMacroCommand = function(){
        this._args = [];
        this._subCommands = [];
        this.onComplete = null;
        this.onCompleteContext = null;
        
        this.initialize.apply(this, arguments);
    };
    
    // Attach all inheritable methods to the ASyncMacroCommand prototype.
    _.extend(ASyncMacroCommand.prototype, {
        /**
         * Initialize the ASyncMacroCommand by adding the sub commands.
         */
        initialize: function(){},
        
        /**
         * Execute all sub commands in added order.
         */
        execute: function(){
            this._args = arguments;
            this.executeNextCommand();
        },
        
        /**
         * Execute upcoming sub command in the queue.
         */
        executeNextCommand: function(){
            if (this._subCommands.length){
                var command = new (this._subCommands.shift());
                var isASync = command.onComplete !== undefined ? true : false;
                
                if (isASync){
                    command.onCompleteContext = this;
                    command.onComplete = this.executeNextCommand;
                    
                    // bind command context, to make async callbacks directly
                    // callable with the correct context
                    if (typeof command.completeCommand == 'function'){
                        _.bindAll(command, 'completeCommand');
                    }
                }
                
                command.execute.apply(command, this._args);
                
                if (!isASync){
                    this.executeNextCommand();
                }
            }
            else{
                if (this.onComplete !== null && typeof this.onComplete == 'function'){
                    this.onComplete.apply(this.onCompleteContext);
                }
                
                this.onCompleteContext = null;
                this.onComplete = null;
            }
        },
        
        /**
         * @param {Backbone.Command|Backbone.MacroCommand|Backbone.ASyncCommand|Backbone.ASyncMacroCommand}
         */
        addSubCommand: function(commandClass){
            this._subCommands.push(commandClass);
        }
    });
    
    // Set up inheritance for Backbone.ASyncMacroCommand.
    Backbone.ASyncMacroCommand.extend = Backbone.Model.extend;
    
})(_, Backbone);
