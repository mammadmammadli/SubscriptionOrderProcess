import { IAsync } from "../models";
import { TSubscriptionPlansReducer } from "../models/reducerModels";
import { subscriptionPlansRoutine } from '../routines/subscriptionPlansRoutines';

const initialState: IAsync<TSubscriptionPlansReducer> = {
	data: null,
	status: "IDLE",
	error: null,
}

export const subscriptionPlansReducer = (
	state = initialState,
	action: { type: string, payload?: any },
): IAsync<TSubscriptionPlansReducer> => {
	switch (action.type) {
		case subscriptionPlansRoutine.SUCCESS:
			return {
				...state,
				data: action.payload,
				status: "SUCCESS",
			}
		case subscriptionPlansRoutine.FAILURE:
			return {
				...state,
				error: action.payload,
				status: "ERROR",
			}
		case subscriptionPlansRoutine.REQUEST:
			return {
				...state,
				status: "PENDING"
			}
		default:
			return state;
	}
}