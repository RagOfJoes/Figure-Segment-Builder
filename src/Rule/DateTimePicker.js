import moment from 'moment';
import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	textDivider: {
		paddingBottom: 0,
		paddingTop: theme.spacing(2)
	},
	toDateContainer: {
		display: ({ conditionSelection }) => (conditionSelection === 'be between' ? 'flex' : 'none')
	}
}));

const conditionValues = ['be before', 'be after', 'be between'];

export default ({ conditionSelection, onConditionChange }) => {
	const classes = useStyles({ conditionSelection });
	const [toDate, handleToDate] = useState(moment());
	const [selectedDate, handleDateChange] = useState(moment());

	const isBetween = conditionSelection === 'be between';
	return (
		<>
			<Grid item>
				<Typography className={classes['textDivider']}>should</Typography>
			</Grid>

			<Grid item>
				<FormControl className={classes['formControl']}>
					<InputLabel id="condition">Condition</InputLabel>
					<Select
						labelId="condition"
						value={conditionSelection}
						onChange={({ target: { value } }) => onConditionChange(value)}>
						{conditionValues.map(v => {
							return (
								<MenuItem key={v} value={v}>
									{v}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Grid>

			<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
				<Grid item>
					<DateTimePicker
						minutesStep={5}
						variant="inline"
						value={selectedDate}
						format="MM/DD/YYYY h:mm a"
						onChange={handleDateChange}
						label={isBetween ? 'From' : 'Date'}
					/>
				</Grid>

				<Grid item className={classes['toDateContainer']}>
					<DateTimePicker
						value={toDate}
						minutesStep={5}
						variant="inline"
						onChange={handleToDate}
						format="MM/DD/YYYY h:mm a"
						label={isBetween ? 'To' : 'Date'}
					/>
				</Grid>
			</MuiPickersUtilsProvider>
		</>
	);
};
