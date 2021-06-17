export interface TAction<T = any> {
	type: string;
	payload?: Text;
}

type TError = {
	code: number;
	message: string;
}

type TStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export interface IAsync<T> {
	data: T | null;
	error: TError | null;
	status: TStatus;
}

export type TForm = {
	month: number;
	gigabyte: number;
	upfrontpayment: boolean;
	cardNumber: number;
	cardExpirationDate: number;
	cardCVV: number;
	mail: string;
	acceptTermAndCondition: boolean;
}