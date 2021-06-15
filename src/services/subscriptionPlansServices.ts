import { Axios } from "../httpclient";
import { TSubscriptionPlans } from "../models/subscriptionPlansModels";

export const fetchAllSubscriptionPlans = () => {
	return Axios.get<TSubscriptionPlans>('prices');
}