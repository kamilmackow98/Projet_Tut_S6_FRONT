import { Rule } from "types";
import { emailRegex } from "utils/misc";

export const isValid = (value: string, rule: Rule) => {
	value = value.trim();

	switch (rule.rule) {
		case "required":
			return !!value;

		case "length": {
			if (rule.min && rule.max) {
				if (value.length >= rule.min && value.length <= rule.max) {
					return true;
				}
			}
			return false;
		}

		case "email": {
			if (emailRegex.test(value)) {
				return true;
			}
			return false;
		}

		default:
			return false;
	}
};

export const isEmailUnique = async (value: string) => {
	const isUnique = await fetch(`api/user/email?email=${value}`, {
		method: "GET",
	})
		.then((res) => res.status)
		.then((status) => {
			if (status === 409) {
				return false;
			}

			return true;
		})
		.catch((e) => console.error(e));

	return isUnique;
};
