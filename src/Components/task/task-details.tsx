import React from 'react'
import { ITask } from '../../Types/task';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
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
                    <FormControl fullWidth>
                        <InputLabel>Assigned To</InputLabel>
                        <Select
                            native
                            fullWidth
                            value={task.assigned_to}
                            onChange={this.handleInputChange}
                            inputProps={{
                                name: 'assigned_to',
                                id: 'assigned_to',
                            }}
                            >
                            <option value={null}>None</option>
                            <option value={1}>Arpit</option>
                            <option value={2}>Dushyant</option>
                            <option value={3}>Prabhat</option>
                            <option value={4}>Shobha</option>
                            <option value={5}>Ahmed</option>
                            <option value={6}>Vambani</option>
                        </Select>
                    </FormControl>
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
                     <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            native
                            fullWidth
                            value={task.priority}
                            onChange={this.handleInputChange}
                            inputProps={{
                                name: 'priority',
                                id: 'priority',
                            }}
                            >                            
                            <option value={1}>LOW</option>
                            <option value={2}>MEDIUM</option>
                            <option value={3}>HIGH</option>
                        </Select>
                    </FormControl>                           
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