import React, { useState, useEffect } from "react";
import db from "./firebaseInit";

export const Context = React.createContext();

export function CustomerProvider({ children }) {
	const state = [];
	const [initialState, setInitialState] = useState([]);
	useEffect(() => {
		db.collection("customers")
			.orderBy("firstName")
			.get()
			.then(qss => {
				qss.forEach(doc => {
					const data = {
						id: doc.id,
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						email: doc.data().email,
						phone: doc.data().phone,
						token: doc.data().token,
					};
					state.push(data);
					setInitialState([...state]);
				});
			});
	}, []);

	const reducer = (action, state) => {
		switch (action.type) {
			case "ADD":
				return addCustomer(state, action.new);
			case "DELETE":
				return deleteCustomer(state, action.token);
			case "UPDATE":
				return updateCustomer(state, action);
			default:
				return state;
		}
	};

	const [currentCustomer, setCurrentCustomer] = useState({
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});

	const deleteCustomer = (state, token) => {
		const newState = state.filter(item => item.token !== token);
		db.collection("customers")
			.where("token", "==", token)
			.get()
			.then(qss => {
				qss.forEach(doc => {
					doc.ref.delete();
				});
			});
		return newState;
	};
	const addCustomer = (state, newData) => {
		db.collection("customers")
			.add(newData)
			.then(() => {
				console.log("Added");
			});
		return [...state, newData];
	};

	const updateCustomer = (state, action) => {
		db.collection("customers")
			.where("token", "==", action.token)
			.get()
			.then(qss => {
				qss.forEach(doc => {
					doc.ref.update(action.updatedCustomer);
				});
			});
		return state.map(item =>
			action.token === item.token ? action.updatedCustomer : item,
		);
	};
	const editCustomer = customer => {
		setCurrentCustomer({
			token: customer.token,
			firstName: customer.firstName,
			lastName: customer.lastName,
			email: customer.email,
			phone: customer.phone,
		});
	};

	return (
		<Context.Provider
			value={{
				setInitialState,
				initialState,
				editCustomer,
				currentCustomer,
				dispatch: action => setInitialState(state => reducer(action, state)),
			}}
		>
			{children}
		</Context.Provider>
	);
}
