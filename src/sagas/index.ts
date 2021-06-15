import { all } from 'redux-saga/effects';
import { fetchSubscriptionPlansSaga } from "./subscriptionPlansSagas";

export default function* rootSaga() {
    yield all([
        fetchSubscriptionPlansSaga()
    ]);
}
