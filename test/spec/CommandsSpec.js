describe('Commands', function(){
    beforeEach(function(){
        this.command = Backbone.Command.extend({
            execute: function(){}
        });
        this.commandsInstance = new Backbone.Commands();
    });
    
    it('is declared', function(){
        expect(window.Backbone.Commands).toBeDefined();
    });
    
    it('can be initialized', function(){
        expect(this.commandsInstance).toBeDefined();
        expect(this.commandsInstance).not.toBeNull();
    });
    
    it('should have an empty commandMap after instantiation', function(){
        expect(this.commandsInstance._commandMap).toBeDefined();
        expect(this.commandsInstance._commandMap).not.toBeNull();
        expect(this.commandsInstance._commandMap).toEqual({});
    });
    
    it('should have a bind method', function(){
        expect(typeof this.commandsInstance.bind).toEqual('function');
    });
    
    it('should have a unbind method', function(){
        expect(typeof this.commandsInstance.unbind).toEqual('function');
    });
    
    it('should have a willTrigger method', function(){
        expect(typeof this.commandsInstance.willTrigger).toEqual('function');
    });
    
    it('should have a trigger method', function(){
        expect(typeof this.commandsInstance.trigger).toEqual('function');
    });
    
    it('should bind a command', function(){
        this.commandsInstance.bind('foo', this.command);
        expect(this.commandsInstance.willTrigger('foo')).toBeTruthy();
    });
    
    it('should throw an error while binding an invalid command', function(){
        expect(function(){
            this.commandsInstance.bind('bar', undefined);
        }).toThrow();
        
        expect(function(){
            this.commandsInstance.bind('bar', null);
        }).toThrow();
        
        expect(function(){
            this.commandsInstance.bind('biz', {execute:function(){}});
        }).toThrow();
    });
    
    it('should not trigger a command', function(){
        this.commandsInstance.bind('bar', this.command);
        expect(this.commandsInstance.willTrigger('foo')).toBeFalsy();
    });
    
    it('should unbind a command', function(){
        this.commandsInstance.bind('foo', this.command);
        this.commandsInstance.unbind('foo');
        expect(this.commandsInstance.willTrigger('foo')).toBeFalsy();
    });
    
});
