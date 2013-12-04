/* EventDispatcher */
(function EventDispatcherModule() {
	var SERIAL = 0;
	Function.prototype.EventDispatcher_ID = {};
	window.EventDispatcher = function EventDispatcher() {
		var _id = SERIAL++;
		var _events = {};
	
		this.addEventListener = function(event, callback) {
			var rry = _events[event];
			if (!rry)
				rry = _events[event] = new Array();
			callback.EventDispatcher_ID[_id] = rry.length;
			rry[callback.EventDispatcher_ID] = callback;
		};
	
		this.removeEventListener = function(event, callback) {
			var _idee = _id;
			var rry = _events[event];
			var id = callback.EventDispatcher_ID[_idee];
			if (!rry || (!id && id !== 0))
				return;
			if (!rry[id])
				return;
	
			rry.splice(id, 1);
	
			var length = rry.length;
			if (!length) {
				delete _events[event];
				delete callback.EventDispatcher_ID[_idee];
				return;
			}
			for (var i = 0; i < length; i++)
				rry[i].EventDispatcher_ID[_idee] = i;
		};
	
		this.dispatchEvent = function(event, data, debug) {
			var rry = _events[event];
			if (!rry)
				return;
			var length = rry.length;
			for (var i = 0; i < length; i++)
				rry[i](data);
		};
	
		this.removeEventListeners = function(event) {
			if (event)
				delete _events[event];
			else
				_events = {};
		};
	};
})();