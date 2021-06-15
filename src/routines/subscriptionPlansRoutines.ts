import { createRoutine } from "redux-saga-routines";
import { ACTIONS } from "../actions/consts";

export const subscriptionPlansRoutine = createRoutine(ACTIONS.FETCH_SUBSCRIPTION_PLANS);
