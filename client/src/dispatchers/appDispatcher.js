const Dispatcher = require('flux').Dispatcher;
const AppDispatcher = new Dispatcher();


AppDispatcher.handleAction = function(action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action,
	});
};

export const dispatch = function(constant, data) {
	
	let action = {
		actionType: constant,
		data: (data ? data : null),
	};

	AppDispatcher.handleAction(action);

};