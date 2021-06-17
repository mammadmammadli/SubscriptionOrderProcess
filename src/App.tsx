import { Button, Card, Container, TextField, Grid, Step, StepContent, StepLabel, Stepper, Typography, FormControlLabel, Checkbox, FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSubscriptionPlansAction } from './actions/subscriptionPlansActions';
import { Async } from './components/Async';
import { IAsync, TForm } from './models';
import { TAppState, TSubscriptionPlansReducer } from "./models/reducerModels";
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { PlanForm } from './forms/PlanForm';
// import { CardForm } from './forms/CardForm';
import { isSuccess } from './utils';
import { TermsAndCondition } from './components/TermsAndConditions';
import { cloneDeep } from "lodash";
import ReactInputMask from 'react-input-mask';
import { CardForm } from './forms/CardForm';

const useStyles = makeStyles({
  cardDetail: {
    display: "flex",
    width: 166,

    "& > div:first-child": {
      flex: 2,
    },
    "& > div:last-child": {
      flex: 1,
    }
  },
  card: {
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "50ms all linear",
    "&:hover": {
      transform: "scale(1.02)"
    }
  },
  summary: {
    margin: "24px 0",
    padding: 8,
  },
  formRow: {
    margin: '10px 0',

    "& > button:first-child": {
      marginRight: 10,
    }
  },
  summaryCard: {
    padding: 10,
    marginBottom: 10,
  }
});

function App() {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { control, formState: { errors, touchedFields }, handleSubmit, watch, setError, clearErrors } = useForm<TForm>();
  const [activeStep, setActiveStep] = useState(0);
  const subscriptionPlansBranch = useSelector<TAppState, IAsync<TSubscriptionPlansReducer>>(
    selector => selector.subscriptionPlansReducer
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const { month, gigabyte, cardCVV, cardExpirationDate, cardNumber } = watch();
  const [showTermsAndCondition, toggleTermsAndCondition] = useState(false);

  useEffect(() => {
    disaptch(fetchAllSubscriptionPlansAction());
  }, [disaptch]);

  useEffect(() => {
    if (isSuccess(subscriptionPlansBranch)) {
      const { data } = subscriptionPlansBranch;

      const initialSelectedPlan = data!.subscription_plans.find(plan => plan.duration_months === month);
      if (initialSelectedPlan) {
        setTotalPrice(initialSelectedPlan?.price_usd_per_gb * gigabyte);
      }
    }
  }, [subscriptionPlansBranch, month, gigabyte]);

  const handleNext = () => {
    if (activeStep === 1) {
      if (!cardExpirationDate) {
        setError('cardExpirationDate', {
          message: "Cannot be empty",
        });
      } else {
        clearErrors('cardExpirationDate');
      }

      if (!cardCVV) {
        setError('cardCVV', {
          message: "Cannot be empty",
        });
      } else {
        clearErrors('cardCVV');
      }

      if (!cardNumber) {
        setError('cardNumber', {
          message: "Cannot be empty",
        });
      } else {
        clearErrors('cardNumber');
      }

      if (!cardCVV || !cardNumber || !cardExpirationDate) return;
    }

    setActiveStep(activeStep + 1);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = () => {

  }

  const selectedPlan = subscriptionPlansBranch?.data?.subscription_plans.find(plan => plan.duration_months === month);

  return (
    <div>
      <Container>
        <Card className={classes.summary}>
          <Typography variant="h5" align="right">Total: {totalPrice}$ </Typography>
        </Card>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Choose plan
            </StepLabel>
            <StepContent>
              <PlanForm
                errors={cloneDeep(errors)}
                classes={classes}
                control={control}
                onNext={handleNext}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Card details
            </StepLabel>
            <StepContent>
              <CardForm
                errors={cloneDeep(errors)}
                classes={classes}
                control={control}
                onNext={handleNext}
                onBack={handleBack}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Summary
            </StepLabel>
            <StepContent>
              <Card className={classes.summaryCard}>
                <div>
                  <p>Total price: <span style={{ fontWeight: "bold" }}>{totalPrice}$</span></p>
                </div>
                <div>
                  <p>Subscription period: <span style={{ fontWeight: "bold" }}>{selectedPlan?.duration_months} months</span></p>
                </div>
                <div>
                  <p>Price per gb: <span style={{ fontWeight: "bold" }}>{selectedPlan?.price_usd_per_gb}$</span></p>
                </div>
              </Card>
              <Card className={classes.summaryCard}>
                <div className={classes.formRow}>
                  <Controller
                    control={control}
                    name="mail"
                    render={({ field }) => (
                      <TextField {...field} label="Mail" />
                    )}
                  />
                </div>
                <div className={classes.formRow}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="acceptTermAndCondition"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            color="primary"
                          />
                        )}
                      />
                    }
                    label={
                      <>
                        I read and agree to the <a href="#" onClick={() => toggleTermsAndCondition(true)}>Terms and Conditions</a>
                      </>
                    }
                  />
                </div>
                <div className={classes.formRow}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(_handleSubmit)}
                  >
                    Submit
                  </Button>
                </div>
              </Card>
            </StepContent>
          </Step>
        </Stepper>
        <Typography variant="h2" align="center" component="h2">Available plans</Typography>
        <Grid container spacing={1}>
          <Async<TSubscriptionPlansReducer>
            branch={subscriptionPlansBranch}
            loadingRenderer={() => (
              <>
                {[0, 1, 2].map((i) => (
                  <Grid item md={4} key={i} lg={4}>
                    <Card className={classes.card}>
                      <Skeleton animation="wave" width="55%" height="56px" />
                      <Skeleton animation="wave" width="45%" height="41px" />
                    </Card>
                  </Grid>
                ))}
              </>
            )}
            successRenderer={(response) => {
              return (
                <>
                  {response.subscription_plans.map((subscriptionPlan, i) => (
                    <Grid key={i} item md={4} lg={4}>
                      <Card className={classes.card}>
                        <Typography align="center" variant="h3" component="h2">
                          {subscriptionPlan.duration_months} month
                        </Typography>
                        <Typography align="center" variant="h5" component="h2">
                          {subscriptionPlan.price_usd_per_gb}$ per GB
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </>
              );
            }}
          />
        </Grid>
      </Container>
      <TermsAndCondition
        isOpen={showTermsAndCondition}
        onClose={() => toggleTermsAndCondition(false)}
      />
    </div>
  );
}

export default App;
