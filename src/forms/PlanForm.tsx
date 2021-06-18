import { FormControl, FormControlLabel, Checkbox, Button, InputLabel, Select, MenuItem, Tooltip, FormHelperText } from '@material-ui/core';
import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import { TForm } from '../models';

type Props = {
	classes: Record<"formRow", string>;
	errors: DeepMap<TForm, FieldError>;
	control: Control<TForm>;
	onNext: () => void;
}

export const PlanForm: React.FC<Props> = ({
	classes,
	errors,
	onNext,
	control,
}) => {
	return (
		<>
			<div className={classes.formRow}>
				<FormControl error={Boolean(errors.month)}>
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
					{errors.month && <FormHelperText>{errors.month.message}</FormHelperText>}
				</FormControl>
			</div>
			<div className={classes.formRow}>
				<FormControl error={Boolean(errors.gigabyte)}>
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
					{errors.gigabyte && <FormHelperText>{errors.gigabyte.message}</FormHelperText>}
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
					onClick={onNext}
				>
					Next
              </Button>
			</div>
		</>
	)
}