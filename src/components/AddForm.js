import React, { useState, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";

import { Context } from "../store";

export default function AddForm() {
	const [redirect, setRedirect] = useState(false);
	const { dispatch, customers } = useContext(Context);
	const firstName = useRef("");
	const lastName = useRef("");
	const email = useRef("");
	const phone = useRef("");

	const addCustomer = e => {
		e.preventDefault();
		dispatch({
			type: "ADD",
			id: customers.length,
			firstName: firstName.current.value,
			lastName: lastName.current.value,
			email: email.current.value,
			phone: phone.current.value,
		});
		setRedirect(true);
	};
	const renderRedirect = redirect === true ? <Redirect to="/" /> : "";
	return (
		<>
			{renderRedirect}
			<div className="row mb-5">
				<div className="col-md-12">
					<h1 className="display-5">Add Customer</h1>
				</div>
			</div>
			<div className="col-md-12">
				<form onSubmit={addCustomer}>
					<div className="row">
						<div className="col">
							<label>First Name</label>
							<input type="text" ref={firstName} className="form-control" />
						</div>
						<div className="col">
							<label>Last Name</label>
							<input type="text" ref={lastName} className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="text" className="form-control" ref={email} />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="text" className="form-control" ref={phone} />
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Add Customer
					</button>
				</form>
			</div>
		</>
	);
}
