import React, { useReducer, useState } from "react";
import { CustomerReducer } from "./reducers";
export const Context = React.createContext();

export function CustomerProvider({ children }) {
	const state = [
		{
			id: 0,
			firstName: "John",
			lastName: "Doe",
			email: "jdoe@gmail.com",
			phone: "555-555-5555",
		},
		{
			id: 1,
			firstName: "Jane",
			lastName: "Doe",
			email: "jdoe@yahoo.com",
			phone: "444-444-4444",
		},
		{
			id: 2,
			firstName: "Arhen",
			lastName: "Santiago",
			email: "arhen@gmail.com",
			phone: "333-333-3333",
		},
	];
	const [customers, dispatch] = useReducer(CustomerReducer, state);

	const [currentCustomer, setCurrentCustomer] = useState({
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});
	const editCustomer = customer => {
		setCurrentCustomer({
			id: customer.id,
			firstName: customer.firstName,
			lastName: customer.lastName,
			email: customer.email,
			phone: customer.phone,
		});
	};

	return (
		<Context.Provider
			value={{
				customers,
				dispatch,
				editCustomer,
				currentCustomer,
			}}
		>
			{children}
		</Context.Provider>
	);
}
