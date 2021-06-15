import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSubscriptionPlansAction } from './actions/subscriptionPlansActions';
import { Async } from './components/Async';
import { IAsync } from './models';
import { TAppState, TSubscriptionPlansReducer } from "./models/reducerModels";

function App() {
  const disaptch = useDispatch();
  const subscriptionPlansBranch = useSelector<TAppState, IAsync<TSubscriptionPlansReducer>>(
    selector => selector.subscriptionPlansReducer
  );

  useEffect(() => {
    disaptch(fetchAllSubscriptionPlansAction());
  }, [disaptch]);

  return (
    <div>
      <Async<TSubscriptionPlansReducer>
        branch={subscriptionPlansBranch}
        loadingRenderer={() => <>Loading..</>}
        successRenderer={(response) => {
          return <>Success</>;
        }}
      />
    </div>
  );
}

export default App;
