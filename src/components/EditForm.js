import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store";

export default function EditForm() {
	const { dispatch, currentCustomer } = useContext(Context);
	const [redirect, setRedirect] = useState(false);
	const [customer, setCustomer] = useState(currentCustomer);

	const renderRedirect = redirect === true ? <Redirect to="/" /> : "";

	const handleChange = e => {
		const { name, value } = e.target;
		setCustomer({ ...customer, [name]: value });
	};

	return (
		<>
			{renderRedirect}
			<div className="row mb-5">
				<div className="col-md-12">
					<h1 className="display-5">Edit Customer</h1>
				</div>
			</div>
			<div className="col-md-12">
				<form
					onSubmit={e => {
						e.preventDefault();
						dispatch({
							type: "UPDATE",
							id: customer.id,
							updatedCustomer: customer,
						});
						setRedirect(true);
					}}
				>
					<div className="row">
						<div className="col">
							<label>First Name</label>
							<input
								type="text"
								name="firstName"
								className="form-control"
								value={customer.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className="col">
							<label>Last Name</label>
							<input
								type="text"
								name="lastName"
								className="form-control"
								value={customer.lastName}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="text"
							name="email"
							className="form-control"
							value={customer.email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="text"
							name="phone"
							className="form-control"
							value={customer.phone}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Edit Customer
					</button>
				</form>
			</div>
		</>
	);
}
