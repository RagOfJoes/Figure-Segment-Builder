import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	textDivider: {
		paddingBottom: 0,
		paddingTop: theme.spacing(2)
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const conditionValues = ['have values', 'not have values'];

export default ({ values, conditionSelection, onConditionChange }) => {
	const classes = useStyles();
	const [value, handleValue] = useState([]);

	const handleChange = event => {
		handleValue(event.target.value);
	};
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

			<Grid item>
				<FormControl className={classes['formControl']}>
					<InputLabel id="multiple-select">Values</InputLabel>
					<Select
						multiple
						value={value}
						MenuProps={MenuProps}
						labelId="multiple-select"
						onChange={e => handleChange(e)}
						input={<Input id="select-multiple-chip" />}
						renderValue={selected => selected.join(', ')}>
						{values.map(name => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={value.indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</>
	);
};
