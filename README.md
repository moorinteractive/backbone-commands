# backbone-commands

[![Build Status](https://secure.travis-ci.org/moorinteractive/backbone-commands.png?branch=master)](https://travis-ci.org/moorinteractive/backbone-commands)

## Installing backbone-commands

The package can be installed through [npm](https://npmjs.org/) or [bower](http://bower.io/).

##### Using npm
```shell
npm install backbone-commands
```

##### Using bower
```shel
bower install backbone-commands
```

After installing the package, you can grab the `backbone-commands.js` or the minified version of it `backbone-commands.min.js`

## Usage examples

##### Binding and triggering commands
```js
// Create an instance of Backbone.Commands where we can do some bindings.
var commands = new Backbone.Commands();

// Bind a Backbone.Command class (note that StartupCommand is not an instance).
commands.bind('startup', StartupCommand);

// Trigger the command.
commands.trigger('startup');
```

##### Give it some payload
```js
// Assume we bind the following command under startup.
var StartupCommand = Backbone.Command.extend({
    execute: function(message, user){
        console.log('Started with message '+message+' by user '+user);
    }
});

// Trigger the command with some payload.
commands.trigger('startup', 'hello world', 'R. Moorman');
```

##### Execute a StartupCommand which has multiple subcommands
```js
// Assume we bind the following command under startup.
var StartupCommand = Backbone.MacroCommand.extend({
    initialize: function(){
        this.addSubCommand(DefineModelCommand);
        this.addSubCommand(DefineViewCommand);
        this.addSubCommand(DefineControllerCommand);
    }
});

// Trigger the command.
commands.trigger('startup');
```

##### Execute a async  StartupCommand which has multiple subcommands
```js
// ASync load of configuration via a provided API endpoint.
var LoadConfigCommand = Backbone.ASyncCommand.extend({
    execute: function(address){
        // Assume a model is available within this command
        this.model.fetch({
            url: address,
            success: this.completeCommand
        });
    }
});

// Assume we bind the following command under startup.
var StartupCommand = Backbone.ASyncMacroCommand.extend({
    initialize: function(){
        this.addSubCommand(LoadConfigCommand);
        this.addSubCommand(DefineModelCommand);
        this.addSubCommand(DefineViewCommand);
        this.addSubCommand(DefineControllerCommand);
    }
});

// Trigger the command.
commands.trigger('startup', 'http://localhost/api/config/?format=json');
```

Note that when you are using an ``ASyncCommand``, you should call ``completeCommand`` when your command has finished it's async logic.
The context of ``completeCommand`` is already bound to the command itself, so callbacks directly to ``completeCommand`` from async loaders like ``jQuery.ajax`` or ``Backbone.Model`` are supported.

## Changelog

0.2.0

* Added usage examples in readme
* Added Backbone.ASyncCommand and ASyncMacroCommand
* Added Backbone.MacroCommand


0.1.0

* Prototype
