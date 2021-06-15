import { IAsync } from ".";

type TSubscriptopnPlan = {
	duration_months: number;
	price_usd_per_gb: number;
}

export type TSubscriptionPlansReducer = {
	subscription_plans: TSubscriptopnPlan[];
}

export type TAppState = {
	subscriptionPlansReducer: IAsync<TSubscriptionPlansReducer>;
};