import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Comments from '../../components/Comments/CommentsContainer';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

// title for modal, includes cross button
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const AnalysisModal = (props) => {
    // handles the opening and closing of the modal
    const { onClose, open } = props;
    const handleClose = () => {
        onClose();
    };

    // ensures formatting of text
    let text = props.data.text;

    // ensure that the application doesn't break when there is are no image in the database
    const analysisImage =
        props.data.images[0] == null ? null : props.data.images[0].image;

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            fullWidth="true"
            maxWidth="lg"
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {props.data.title}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom variant="h5">
                    {props.data.stock}
                </Typography>
                <img
                    src={analysisImage}
                    alt="blank"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                />
                <DialogContentText
                    style={{ whiteSpace: 'break-spaces' }}
                    dangerouslySetInnerHTML={{ __html: text }}
                />

                <Comments id={props.data.id} />
            </DialogContent>
        </Dialog>
    );
};

export default AnalysisModal;
