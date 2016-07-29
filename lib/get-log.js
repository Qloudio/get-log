var util = require('util');

// Loggers cache
var loggers = {};

// Export the `get logger by name` function
module.exports = exports = function (name) {
    return loggers[name] || (loggers[name] = new Logger(name));
};

// Enable a specific `namespace` (separated by comma and with wildcards if needed)
exports.enable = function() {
}

function Logger(name) {
    var prjName = module.exports.PROJECT_NAME;
    this.enabled = () => {}
    this.name = prjName ? prjName + ':' + name : name;
    this.debugEnabled = false
}

function logDebug() {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[DEBUG] ', null, args);
}

function writeOutput(prefix, loggerName, args) {
    args[0] = prefix + new Date().toUTCString() +
        (loggerName ? '  ' + loggerName + ' ' : '') + args[0];
    return 'object' === typeof console
        && console.log
        && Function.prototype.apply.call(console.log, console, args);
}

// Log DEBUG message in std out, CAN be disabled/enabled
Logger.prototype.debug = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[DEBUG] ', this.name, args);
};

// Log ERROR message in std err, cannot be disabled
Logger.prototype.error = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[ERROR] ', this.name, args);
};

// Log WARN message in std out, cannot be disabled
Logger.prototype.warn = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[WARN] ', this.name, args);
};

// Log INFO message in std out, cannot be disabled
Logger.prototype.info = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[INFO] ', this.name, args);
};

// Check if debug is enabled
Logger.prototype.isDebugEnabled = function () {
    return this.debugEnabled;
};

Logger.prototype.setEnabled = function (enabled) {
  this.debugEnabled = !!enabled
};

// Retrieve the logger name
Logger.prototype.getName = function () {
    return this.name;
};
