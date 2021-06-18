import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { TForm } from '../models';

type Props = {
	classes: Record<"formRow", string>;
	errors: DeepMap<TForm, FieldError>;
	control: Control<TForm>;
	onNext: () => void;
	onBack: () => void;
}

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
	}
});

export const CardForm: React.FC<Props> = ({
	classes,
	errors,
	onBack,
	control,
	onNext,
}) => {
	const styles = useStyles();

	return (
		<>
			<div className={classes.formRow}>
				<Controller
					name="cardNumber"
					control={control}
					rules={{
						required: true,
					}}
					render={({ field, fieldState, formState }) => {
						return (
							<>
								<ReactInputMask
									{...field}
									mask="9999-9999-9999-9999"
									placeholder="1234-5678-9012-3456"
								>
									{(props: any) => (
										<TextField
											error={errors.cardNumber}
											helperText={errors.cardNumber && errors.cardNumber.message}
											label="Number" {...props}
										/>
									)}
								</ReactInputMask>
							</>
						)
					}}
				/>
			</div>
			<div className={styles.cardDetail}>
				<div>
					<FormControl>
						<Controller
							name="cardExpirationDate"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<ReactInputMask
									{...field}
									mask="99 / 99"
									placeholder="MM YY"
								>
									{(props: any) => (
										<TextField
											error={errors.cardExpirationDate}
											label="Expiration date"
											helperText={errors.cardExpirationDate && errors.cardExpirationDate.message}
											{...props}

										/>
									)}
								</ReactInputMask>
							)}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<Controller
							name="cardCVV"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<ReactInputMask
									{...field}
									mask="999"
									placeholder="123"
								>
									{(props: any) => (
										<TextField
											{...props}
											error={errors.cardCVV}
											helperText={errors.cardCVV && errors.cardCVV.message}
											label="CVV"
										/>
									)}
								</ReactInputMask>
							)}
						/>
					</FormControl>
				</div>
			</div>
			<div className={classes.formRow}>
				<Button
					variant="contained"
					color="default"
					onClick={onBack}
				>
					Back
        </Button>
				<Button
					variant="contained"
					color="primary"
					onClick={onNext}
				>
					Next
        </Button>
			</div>
		</>
	)
}