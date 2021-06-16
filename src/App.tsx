import { Button, Card, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Step, StepContent, StepLabel, Stepper, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSubscriptionPlansAction } from './actions/subscriptionPlansActions';
import { Async } from './components/Async';
import { IAsync } from './models';
import { TAppState, TSubscriptionPlansReducer } from "./models/reducerModels";
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles({
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
  }
});

function App() {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const subscriptionPlansBranch = useSelector<TAppState, IAsync<TSubscriptionPlansReducer>>(
    selector => selector.subscriptionPlansReducer
  );

  useEffect(() => {
    disaptch(fetchAllSubscriptionPlansAction());
  }, [disaptch]);

  const handleNext = () => {
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <div>
      <Container>
        <Card className={classes.summary}>
          <Typography variant="h5" align="right">Total: </Typography>
        </Card>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Choose plan
            </StepLabel>
            <StepContent>
              <div className={classes.formRow}>
                <FormControl>
                  <InputLabel>Month</InputLabel>
                  <Controller
                    defaultValue={12}
                    name="month"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} style={{ width: 200 }}>
                        <MenuItem value={3}>3 Months</MenuItem>
                        <MenuItem value={6}>6 Months</MenuItem>
                        <MenuItem value={12}>12 Months</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.month && <span>This field is required</span>}
              </div>
              <div className={classes.formRow}>
                <FormControl>
                  <InputLabel>Gigabytes</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select {...field} style={{ width: 200 }}>
                        <MenuItem value={5}>5 GB</MenuItem>
                        <MenuItem value={10}>10 GB</MenuItem>
                        <MenuItem value={50}>50 GB</MenuItem>
                      </Select>
                    )}
                    defaultValue={5}
                    name="gigabyte"
                    control={control}
                    rules={{
                      required: true,
                    }}
                  />
                </FormControl>
              </div>
              <div className={classes.formRow}>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <Tooltip placement="right" title="10% discount">
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              color="primary"
                            />
                          }
                          label="Upfront payment"
                        />
                      </Tooltip>
                    )}
                    defaultValue={false}
                    name="upfrontpayment"
                    control={control}
                  />
                </FormControl>
              </div>
              <div className={classes.formRow}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(handleNext)}
                >
                  Next
              </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Choose plan
            </StepLabel>
            <StepContent>
              <Button
                variant="contained"
                color="default"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleNext)}
              >
                Next
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Choose plan
            </StepLabel>
            <StepContent>
              <div>1</div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
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
    </div>
  );
}

export default App;
