import { IAsync } from ".";
import { TSubscriptionPlans } from "./subscriptionPlansModels";

export interface TSubscriptionPlansReducer extends TSubscriptionPlans { }

export type TAppState = {
	subscriptionPlansReducer: IAsync<TSubscriptionPlansReducer>;
};