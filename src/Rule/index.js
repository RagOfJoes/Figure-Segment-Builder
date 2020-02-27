import String from './String';
import CustomSelect from './Select';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from './DateTimePicker';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';

/**
 * TODO:
 * Create And Segments
 * Create Or Segments
 * Create structure for Options for Dropdowns
 */
const config = {
	Name: {
		type: 'string'
	},
	Source: {
		type: 'multi_select',
		values: ['Web', 'Email', 'Phone', 'Other']
	},
	'Date subscribed': {
		type: 'date'
	}
};

const useStyles = makeStyles(theme => ({
	container: {
		paddingTop: 0
	},
	formControl: {
		minWidth: 120
	},
	textDivider: {
		paddingBottom: 0,
		paddingTop: theme.spacing(2)
	}
}));

export default ({ index, onOr, onDelete, showOrButton }) => {
	const classes = useStyles();
	const [keySelection, toggleKey] = useState('');
	const [conditionSelection, toggleCondition] = useState('');
	return (
		<Grid
			item
			container
			wrap="nowrap"
			direction="row"
			alignItems="center"
			justify="space-between"
			className={classes['container']}>
			<Grid item container spacing={3} wrap="nowrap" direction="row" alignItems="center">
				<Grid item>
					<FormControl className={classes['formControl']}>
						<InputLabel id="key">Rule #{index}</InputLabel>
						<Select
							labelId="key"
							value={keySelection}
							MenuProps={{ variant: 'menu' }}
							onChange={({ target: { value } }) => toggleKey(value)}>
							{Object.keys(config).map(k => {
								return (
									<MenuItem key={k} value={k}>
										{k}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
				{keySelection && config[keySelection].type === 'string' && (
					<String onChange={value => toggleCondition(value)} conditionSelection={conditionSelection} />
				)}
				{keySelection && config[keySelection].type === 'multi_select' && (
					<CustomSelect
						values={config[keySelection].values}
						conditionSelection={conditionSelection}
						onConditionChange={value => toggleCondition(value)}
					/>
				)}
				{keySelection && config[keySelection].type === 'date' && (
					<DateTimePicker conditionSelection={conditionSelection} onConditionChange={value => toggleCondition(value)} />
				)}
			</Grid>

			<Grid item container spacing={1} direction="row" justify="flex-end" alignItems="center">
				{showOrButton && (
					<Grid item>
						<Button variant="text" onClick={onOr}>
							or
						</Button>
					</Grid>
				)}
				<Grid item>
					<Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => onDelete(index)}>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
