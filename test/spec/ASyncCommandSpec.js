describe('ASyncCommand', function(){
    
    it('is declared', function(){
        expect(window.Backbone.ASyncCommand).toBeDefined();
    });
    
    it('can be initialized', function(){
        var commandInstance = new Backbone.ASyncCommand();
        
        expect(commandInstance).toBeDefined();
        expect(commandInstance).not.toBeNull();
    });
    
    it('should have no onComplete callback after instantiation', function(){
        var commandInstance = new Backbone.ASyncCommand();
        
        expect(commandInstance.onComplete).toBeDefined();
        expect(commandInstance.onComplete).toBeNull();
    });
    
    it('should have an execute method', function(){
        var commandInstance = new Backbone.ASyncCommand();
        
        expect(typeof commandInstance.execute).toEqual('function');
    });
    
    it('should have a complete method', function(){
        var commandInstance = new Backbone.ASyncCommand();
        
        expect(typeof commandInstance.completeCommand).toEqual('function');
    });
    
    it('should execute', function(){
        var flag = false;
        var args = [];
        var command = Backbone.ASyncCommand.extend({
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
    
    it('should complete the callback', function(){
        var spy = sinon.spy();
        var context = {};
        
        var commandInstance = new Backbone.ASyncCommand();
        commandInstance.onCompleteContext = context;
        commandInstance.onComplete = spy;
        commandInstance.completeCommand();
        
        expect(spy.called).toBeTruthy();
    });
    
});
