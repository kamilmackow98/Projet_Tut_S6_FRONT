import { Link, useLocation } from "react-router-dom";
import React from "react";

const NestedRoutes: React.FC = () => {
	const location = useLocation();

	return (
		<div>
			Nested Component !<br />
			<Link to={`${location.pathname}/another-nested`}>
				Link to AnotherNested Component
			</Link>
		</div>
	);
};

export default NestedRoutes;
