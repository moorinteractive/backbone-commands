describe('MacroCommand', function(){
    
    it('is declared', function(){
        expect(window.Backbone.MacroCommand).toBeDefined();
    });
    
    it('can be initialized', function(){
        var commandInstance = new Backbone.MacroCommand();
        
        expect(commandInstance).toBeDefined();
        expect(commandInstance).not.toBeNull();
    });
    
    it('has no subCommands after instantiation', function(){
        var commandInstance = new Backbone.MacroCommand();
        
        expect(commandInstance._subCommands).toBeDefined();
        expect(commandInstance._subCommands).not.toBeNull();
        expect(commandInstance._subCommands.length).toBe(0);
    });
    
    it('should have an execute method', function(){
        var commandInstance = new Backbone.MacroCommand();
        
        expect(typeof commandInstance.execute).toEqual('function');
    });
    
    it('should have an addSubSommand method', function(){
        var commandInstance = new Backbone.MacroCommand();
        
        expect(typeof commandInstance.addSubCommand).toEqual('function');
    });
    
    it('should add a sub command', function(){
        var commandInstance = new (Backbone.MacroCommand.extend({
            initialize: function(){
                this.addSubCommand(Backbone.Command);
                this.addSubCommand(Backbone.Command);
            }
        }));
        
        expect(commandInstance._subCommands.length).toBe(2);
    });
    
    it('should execute', function(){
        var args = [];
        
        var commandInstance = Backbone.MacroCommand.extend({
            initialize: function(){
                this.addSubCommand(Backbone.Command.extend({
                    execute: function(){
                        args.push(arguments[0]);
                    }
                }));
                this.addSubCommand(Backbone.Command.extend({
                    execute: function(){
                        args.push(arguments[1]);
                    }
                }));
            }
        });
        
        var commandsInstance = new Backbone.Commands();
        commandsInstance.bind('foo', commandInstance);
        commandsInstance.trigger('foo', 1, 2);
        
        expect(args).toEqual([1, 2]);
    });
    
});
