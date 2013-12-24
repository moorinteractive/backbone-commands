describe('ASyncMacroCommand', function(){
    
    it('is declared', function(){
        expect(window.Backbone.ASyncMacroCommand).toBeDefined();
    });
    
    it('can be initialized', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(commandInstance).toBeDefined();
        expect(commandInstance).not.toBeNull();
    });
    
    it('should not have args after instantiation', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(commandInstance._args).toBeDefined();
        expect(commandInstance._args).not.toBeNull();
        expect(commandInstance._args.length).toBe(0);
    });
    
    it('should not have subCommands after instantiation', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(commandInstance._subCommands).toBeDefined();
        expect(commandInstance._subCommands).not.toBeNull();
        expect(commandInstance._subCommands.length).toBe(0);
    });
    
    it('should have no onComplete callback after instantiation', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(commandInstance.onComplete).toBeDefined();
        expect(commandInstance.onComplete).toBeNull();
    });
    
    it('should have an execute method', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(typeof commandInstance.execute).toEqual('function');
    });
    
    it('should have an executeNextCommand method', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(typeof commandInstance.executeNextCommand).toEqual('function');
    });
    
    it('should have an addSubSommand method', function(){
        var commandInstance = new Backbone.ASyncMacroCommand();
        
        expect(typeof commandInstance.addSubCommand).toEqual('function');
    });
    
    it('should add a sub command', function(){
        var commandInstance = new (Backbone.ASyncMacroCommand.extend({
            initialize: function(){
                this.addSubCommand(Backbone.Command);
                this.addSubCommand(Backbone.Command);
            }
        }));
        
        expect(commandInstance._subCommands.length).toBe(2);
    });
    
    it('should execute', function(){
        var args = [];
        
        var commandInstance = Backbone.ASyncMacroCommand.extend({
            initialize: function(){
                this.addSubCommand(Backbone.ASyncCommand.extend({
                    execute: function(){
                        args.push(arguments[0]);
                        this.completeCommand();
                    }
                }));
                this.addSubCommand(Backbone.ASyncCommand.extend({
                    execute: function(){
                        args.push(arguments[1]);
                        this.completeCommand();
                    }
                }));
            }
        });
        
        var commandsInstance = new Backbone.Commands();
        commandsInstance.bind('foo', commandInstance);
        commandsInstance.trigger('foo', 1, 2);
        
        expect(args).toEqual([1, 2]);
    });
    
    it('should execute not async commands', function(){
        var args = [];
        
        var commandInstance = Backbone.ASyncMacroCommand.extend({
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
    
    it('should execute inherited asyncmacrocommand', function(){
        var args = [];
        
        var commandInstance = Backbone.ASyncMacroCommand.extend({
            initialize: function(){
                this.addSubCommand(Backbone.ASyncMacroCommand.extend({
                    initialize: function(){
                        this.addSubCommand(Backbone.ASyncCommand.extend({
                            execute: function(){
                                args.push(arguments[0]);
                                this.completeCommand();
                            }
                        }));
                    }
                }));
                this.addSubCommand(Backbone.ASyncCommand.extend({
                    execute: function(){
                        args.push(arguments[1]);
                        this.completeCommand();
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
