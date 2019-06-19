import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store";

export default function Customers() {
	const { customers, dispatch, editCustomer } = useContext(Context);
	const deleteCustomer = id => {
		dispatch({
			type: "DELETE",
			id: id,
		});
	};
	return (
		<>
			<div className="row mb-3">
				<div className="col-md-12">
					<h1 className="display-5">Customer Lists</h1>
					<Link className="btn btn-primary float-right" to="/customer-form">
						Add Customer
					</Link>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col" />
								<th scope="col" />
							</tr>
						</thead>
						<tbody>
							{customers.map(item => (
								<tr key={item.id}>
									<td>
										{item.firstName} {item.lastName}
									</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => deleteCustomer(item.id)}
										>
											Delete
										</button>
									</td>
									<td>
										<Link
											to={`/edit-customer`}
											className="btn btn-warning"
											onClick={() => editCustomer(item)}
										>
											Edit
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{console.log(customers)}
		</>
	);
}
