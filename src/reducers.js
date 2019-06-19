export function CustomerReducer(state, action) {
	switch (action.type) {
		case "ADD":
			return [
				...state,
				{
					id: action.id,
					firstName: action.firstName,
					lastName: action.lastName,
					email: action.email,
					phone: action.phone,
				},
			];
		case "DELETE":
			return state.filter(item => item.id !== action.id);
		case "UPDATE":
			return state.map(item =>
				action.id === item.id ? action.updatedCustomer : item,
			);
		default:
			return state;
	}
}
