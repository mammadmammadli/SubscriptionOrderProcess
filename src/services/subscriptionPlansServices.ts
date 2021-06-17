import { Axios } from "../httpclient";
import { TSubscriptionPlans } from "../models/subscriptionPlansModels";
import axios from 'axios';
import { TForm } from "../models";

export const fetchAllSubscriptionPlans = () => {
	return Axios.get<TSubscriptionPlans>('prices');
}

export const submitSubscriptionPlan = () => {
	return axios.post<TForm, any>('https://httpbin.org/post');
}