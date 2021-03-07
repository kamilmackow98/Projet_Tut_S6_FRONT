import React from "react";
import { Link, useLocation } from "react-router-dom";

const NestedRoutes = () => {
	const location = useLocation();

	return (
		<div>
			Nested Component !<br />
			<Link to={`${location.pathname}/another-nested`}>Link to AnotherNested Component</Link>
		</div>
	);
};

export default NestedRoutes;
