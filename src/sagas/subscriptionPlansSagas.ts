import { put, takeEvery } from 'redux-saga/effects'
import { ACTIONS } from "../actions/consts";
import { TSubscriptionPlans } from '../models/subscriptionPlansModels';
import { fetchAllSubscriptionPlans } from "../services/subscriptionPlansServices";
import { subscriptionPlansRoutine } from "../routines/subscriptionPlansRoutines";
import { AxiosResponse } from 'axios';

function* fetchSubscriptionPlans() {
    try {
        yield put(subscriptionPlansRoutine.request());
        const response: AxiosResponse<TSubscriptionPlans> = yield fetchAllSubscriptionPlans();

        yield put(subscriptionPlansRoutine.success(response.data));
    } catch (e) {
        yield put(subscriptionPlansRoutine.failure(e.message));
    }
}

export function* fetchSubscriptionPlansSaga() {
    yield takeEvery(ACTIONS.FETCH_SUBSCRIPTION_PLANS, fetchSubscriptionPlans);
}