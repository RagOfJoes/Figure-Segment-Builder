import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	formControl: {
		minWidth: 120
	},
	textDivider: {
		paddingBottom: 0,
		paddingTop: theme.spacing(2)
	}
}));

const values = ['contain', 'not contain', 'extacly match', 'not exactly match'];

export default ({ onChange, conditionSelection }) => {
	const classes = useStyles();
	return (
		<>
			<Grid item>
				<Typography className={classes['textDivider']}>should</Typography>
			</Grid>

			<Grid item>
				<FormControl className={classes['formControl']}>
					<InputLabel id="condition">Condition</InputLabel>
					<Select labelId="condition" value={conditionSelection} onChange={({ target: { value } }) => onChange(value)}>
						{values.map(v => {
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
				<TextField label="Keyword" />
			</Grid>
		</>
	);
};
