import { ACTIONS } from "./consts";

export const fetchAllSubscriptionPlansAction = () => {
    return ({
        type: ACTIONS.FETCH_SUBSCRIPTION_PLANS,
    });
}
