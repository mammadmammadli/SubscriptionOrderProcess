import { Axios } from "../httpclient";
import { TSubscriptionPlans } from "../models/subscriptionPlansModels";
import axios from 'axios';
import { ISubscribePlanRq } from "../models";

export const fetchAllSubscriptionPlans = () => {
	return Axios.get<TSubscriptionPlans>('prices');
}

export const submitSubscriptionPlan = (data: ISubscribePlanRq) => {
	return axios.post<ISubscribePlanRq, any>('https://httpbin.org/post', data);
}