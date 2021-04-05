import React from "react";
import Loader from "./Loader";

interface Props {
	fixed?: boolean;
	delay?: number;
}

const DelayedLoader: React.FC<Props> = ({ fixed = false, delay = 0 }) => {
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	if (!show) {
		return null;
	}

	return <Loader fixed={fixed} />;
};

export default DelayedLoader;
