import Rule from './Rule';
import uniqueId from 'lodash/uniqueId';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	container: {
		zIndex: 1,
		boxShadow: theme.shadows[2],
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.default,
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
		// marginTop: ({ index }) => index > 0 && theme.spacing(6)
	},
	ruleContainer: {
		marginTop: theme.spacing(2)
	}
}));

export default ({ index, onDelete }) => {
	const classes = useStyles({ index });
	const [isEditingTitle, toggleEditingTitle] = useState(false);
	const [segmentTitle, changeSegmentTitle] = useState('Segment Title');
	const [rules, changeRules] = useState(() => [uniqueId(segmentTitle + '-rule-')]);

	const handleDelete = index => {
		const newRules = rules;
		const indexOf = newRules.indexOf(index);

		if (indexOf === -1) return;

		if (rules.length === 1) {
			onDelete();
			return;
		}

		return changeRules(newRules.filter((v, i) => i !== indexOf));
	};

	return (
		<Grid container direction="column" className={classes['container']}>
			<Grid item>
				{isEditingTitle ? (
					<TextField
						autoFocus
						label="Title"
						value={segmentTitle}
						onChange={({ target: { value } }) => changeSegmentTitle(value)}
						onBlur={() => {
							if (segmentTitle.length === 0) changeSegmentTitle('Segment Title');
							setTimeout(() => toggleEditingTitle(false), 250);
						}}
					/>
				) : (
					<Typography onClick={() => toggleEditingTitle(true)} variant="body1">
						{segmentTitle}
					</Typography>
				)}
			</Grid>
			{rules.map((rule, i) => {
				return (
					<Grid
						key={rule}
						item
						container
						spacing={4}
						direction="column"
						justify="space-between"
						className={classes['ruleContainer']}
					>
						<Rule
							index={i + 1}
							onDelete={() => handleDelete(rule)}
							showOrButton={i === rules.length - 1}
							onOr={() => {
								changeRules(rules.concat([uniqueId(segmentTitle + '-rule-')]));
							}}
						/>
						{rules.length > 1 && i !== rules.length - 1 && (
							<Grid item>
								<Divider variant="fullWidth" />
							</Grid>
						)}
					</Grid>
				);
			})}
		</Grid>
	);
};
