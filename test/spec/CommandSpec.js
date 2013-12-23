describe('Command', function(){
    
    it('is declared', function(){
        expect(window.Backbone.Command).toBeDefined();
    });
    
    it('is can be initialized', function(){
        var commandInstance = new Backbone.Command();
        
        expect(commandInstance).toBeDefined();
        expect(commandInstance).not.toBeNull();
    });
    
    it('has an execute method', function(){
        var commandInstance = new Backbone.Command();
        
        expect(typeof commandInstance.execute).toEqual('function');
    });
    
    it('should execute', function(){
        var flag = false;
        var args = [];
        
        var command = Backbone.Command.extend({
            execute: function(){
                flag = true;
                args = arguments;
            }
        });
        
        var commandsInstance = new Backbone.Commands();
        commandsInstance.bind('foo', command);
        commandsInstance.trigger('foo', 1, 2, 3);
        
        expect(flag).toBeTruthy();
        expect(args).toEqual([1, 2, 3]);
    });
    
});
