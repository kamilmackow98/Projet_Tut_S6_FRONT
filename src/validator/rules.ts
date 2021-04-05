import { Rules } from "types";

export const rules: Rules = {
	firstname: [
		{
			rule: "required",
			message: "This field is required.",
		},
		{
			rule: "length",
			min: 3,
			max: 255,
			message: "Must be between 3 and 255 characters long.",
		},
	],
	lastname: [
		{
			rule: "required",
			message: "This field is required.",
		},
		{
			rule: "length",
			min: 3,
			max: 255,
			message: "Must be between 3 and 255 characters long.",
		},
	],
	email: [
		{
			rule: "required",
			message: "This field is required.",
		},
		{
			rule: "length",
			min: 3,
			max: 255,
			message: "Must be between 3 and 255 characters long.",
		},
		{
			rule: "email",
			message: "Email is not valid.",
		},
	],
	password: [
		{
			rule: "required",
			message: "This field is required.",
		},
		{
			rule: "length",
			min: 7,
			max: 255,
			message: "Must be between 7 and 255 characters long.",
		},
	],
	confirmPassword: [
		{
			rule: "required",
			message: "This field is required.",
		},
	],
};
