import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Customers from "./components/Customers";
import AddForm from "./components/AddForm";
import { CustomerProvider } from "./store";
import EditForm from "./components/EditForm";

function App() {
	return (
		<CustomerProvider>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<Route path="/" exact component={Customers} />
						<Route path="/customer-form" exact component={AddForm} />
						<Route path="/edit-customer" exact component={EditForm} />
					</Switch>
				</div>
			</Router>
		</CustomerProvider>
	);
}
export default App;
