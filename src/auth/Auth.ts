import Cookie from "js-cookie";

export const checkAuth = async () => {
	let isTokenValid: boolean = false;
	let token = Cookie.get("token");

	// The ternarny operator cannot be used since Cookie.get may return undefined
	if (!token) {
		token = "";
	}

	isTokenValid = await fetch("/api/user/token", {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: token,
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
	Cookie.remove("token");
}
