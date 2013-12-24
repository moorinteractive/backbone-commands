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
// Create an instance of Backbone.Command where we can bind and trigger commands.
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

## Changelog

0.1.1

* Added Backbone.MacroCommand


0.1.0

* Prototype
