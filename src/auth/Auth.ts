import Cookies from "js-cookie";

export const checkAuth = async () => {
	let isTokenValid: boolean = false;
	const token: string | undefined = Cookies.get('token');

	isTokenValid = await fetch("/api/user/token", {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"Authorization": token ? token : "",
		},
	})
		.then((res) => res.status)
		.then((status) => {
			if (status === 200) {
				return true;
			}

			return false;
		})
		.catch((e) => {
			console.error(e);
			return false;
		});

	return isTokenValid;
};

export const removeToken = () => {
	Cookies.remove("token");
}
