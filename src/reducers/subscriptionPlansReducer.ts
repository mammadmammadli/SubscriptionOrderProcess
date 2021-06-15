import { Reducer } from "redux";
import { IAsync } from "../models";
import { TSubscriptionPlansReducer } from "../models/reducerModels";

const initialState: IAsync<TSubscriptionPlansReducer> = {
    data: null,
    status: "IDLE",
    error: null,
}

export const subscriptionPlansReducer = (
    state = initialState,
): IAsync<TSubscriptionPlansReducer> => {
    return state;
}