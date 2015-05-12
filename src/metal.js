Marionette.Class = Metal.Class.extend({
  constructor: function(options) {
    this.options = _.extend({}, _.result(this, 'options'), options);

    this._super.apply(this, arguments);
  },

  destroy: function() {
    this.triggerMethod('before:destroy');
    this.triggerMethod('destroy');
    this.stopListening();

    return this;
  },

  // Import the `triggerMethod` to trigger events with corresponding
  // methods if the method exists
  triggerMethod: Marionette.triggerMethod,

  // A handy way to merge options onto the instance
  mergeOptions: Marionette.mergeOptions,

  // Proxy `getOption` to enable getting options from this or this.options by name.
  getOption: Marionette.proxyGetOption,

  // Proxy `bindEntityEvents` to enable binding view's events from another entity.
  bindEntityEvents: Marionette.proxyBindEntityEvents,

  // Proxy `unbindEntityEvents` to enable unbinding view's events from another entity.
  unbindEntityEvents: Marionette.proxyUnbindEntityEvents
});

var initKeys = ['constructor', 'initialize'];
var eventKeys = _.keys(Backbone.Events);
var classKeys = _.keys(Marionette.Class);

function classify(obj) {
  var protoProps = _.extend({constructor: obj}, _.omit(obj.prototype, eventKeys, initKeys));
  var staticProps = _.omit(obj, classKeys, initKeys);

  return Marionette.Class.extend(protoProps, staticProps);
}

Marionette.Mixin      = Metal.Mixin;
Marionette.Events     = Backbone.Events     = new Marionette.Mixin(Backbone.Events);
Marionette.Model      = Backbone.Model      = classify(Backbone.Model);
Marionette.Collection = Backbone.Collection = classify(Backbone.Collection);
Backbone.View         = classify(Backbone.View);
Marionette.Router     = Backbone.Router     = classify(Backbone.Router);
Marionette.History    = Backbone.History    = classify(Backbone.History);
Marionette.history    = Backbone.history    = new Marionette.History();
