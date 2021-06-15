import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllSubscriptionPlansAction } from './actions/subscriptionPlansActions';

function App() {
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(fetchAllSubscriptionPlansAction());
  }, [disaptch]);

  return (
    <div>
      asd
    </div>
  );
}

export default App;
