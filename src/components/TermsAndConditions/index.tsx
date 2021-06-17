import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import React from 'react';

type Props = {
	isOpen: boolean;
	onClose: VoidFunction;
}

const useStyles = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		padding: 20,
		borderRadius: 5,
		backgroundColor: "white",
	},
}));

export const TermsAndCondition: React.FC<Props> = ({
	isOpen,
	onClose
}) => {
	const classes = useStyles();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={isOpen}
			onClose={onClose}
			closeAfterTransition
			className={classes.modal}
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpen}>
				<div className={classes.paper}>
					<h2>Terms and Conditions</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab est inventore nihil libero magni in repellendus expedita exercitationem, impedit corporis! Et maxime vitae quod. Nemo nobis quisquam quibusdam consectetur. Corporis?
					</p>
				</div>
			</Fade>
		</Modal>
	);
}