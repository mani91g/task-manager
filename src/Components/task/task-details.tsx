import React from 'react'
import { ITask } from '../../Types/task';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogActions, TextField } from '@material-ui/core';
import * as moment from 'moment';

export default class TaskDetails extends React.Component<IProps>{
    handleInputChange =(e) =>{
        this.props.handleInputChange(e)
    }

    render() {
        const { task, open } = this.props
        const formatDate = moment(task.due_date).format('YYYY-MM-DD')
        return (
            <div>
                <Dialog onClose={this.props.handleClose} fullScreen open={open}>
                    <DialogTitle id="simple-dialog-title"></DialogTitle>
                    <DialogContent>
                        
                    <TextField
                        autoFocus
                        margin="dense"
                        id="message"
                        label="Task Details"
                        type="email"
                        fullWidth
                        onChange={this.handleInputChange}
                        value={task.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="assigned_name"
                        label="Assigned To"
                        type="string"
                        fullWidth
                        value={task.assigned_name}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="due_date"
                        label="Due date"
                        type="date"
                        fullWidth
                        value={formatDate}
                        onChange={this.handleInputChange}
                    />
                        
                    </DialogContent>
                    <DialogActions>
                    <Button
                         variant="outlined"
                            className={"testcss"}
                            onClick={ () =>{ task.id && task.id > 0 ? this.props.handleUpdateTask(task) : this.props.handleCreateTask(task)}}
                        >
                        Save
                    </Button>
                    <Button
                         variant="outlined"
                            className={"testcss"}
                            onClick={this.props.handleClose}
                        >
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }
}

interface IProps {
    task: ITask;
    handleClose: () => void;
    handleInputChange:(event) => void;
    open: boolean;
    handleUpdateTask:(task:ITask) => void;
    handleCreateTask:(task:ITask) => void;
}