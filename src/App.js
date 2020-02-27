import './App.scss';
import Segment from './Segment';
import uniqueId from 'lodash/uniqueId';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	divider: {
		width: 1.5,
		opacity: 0.45,
		height: theme.spacing(8),
		marginLeft: theme.spacing(2),
		backgroundColor: theme.palette.primary.main
	},
	addButton: {
		marginTop: theme.spacing(4)
	}
}));

export default () => {
	const classes = useStyles();
	const [segments, changeSegments] = useState(() => [uniqueId('segment-')]);

	const handleDelete = index => {
		const newSegments = segments;
		const indexOf = newSegments.indexOf(index);
		console.log(index, indexOf);

		if (indexOf === -1) return;

		if (segments.length === 1) return;

		return changeSegments(newSegments.filter((v, i) => i !== indexOf));
	};
	return (
		<div className="App">
			<Grid container direction="column">
				{segments.map((segment, i) => {
					return (
						<React.Fragment key={segment}>
							{i > 0 && <Divider orientation="vertical" className={classes['divider']} />}
							<Segment index={i} onDelete={() => handleDelete(segment)} />
						</React.Fragment>
					);
				})}

				<Grid item>
					<Button
						size="large"
						color="primary"
						variant="contained"
						className={classes['addButton']}
						onClick={() => changeSegments(segments.concat([uniqueId('segment-')]))}
					>
						Add
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};
