
const AppReducer = (state, action) => {
	switch (action.type) {
		case '':
			return {
				state,
				
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export {
    AppReducer
}
