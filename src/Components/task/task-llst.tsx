import React from "react";
import { ITask, IPriority } from "../../Types/task";
import TaskDetails from "../task/task-details"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//import Fab from '@material-ui/core/Fab';
//import { Button } from "@material-ui/core";
import { isEqual } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface IColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}



const columns: IColumn[] = [
    { id: 'message', label: 'Task', minWidth: 170 },
    { id: 'priority', label: 'Priority',minWidth: 100, format: (value: number) => getPriority(value)},
    {
        id: 'assigned_name',
        label: 'Assigned To',
        minWidth: 170,
        align: 'right',
    },
]    

const getPriority = (value: number): string =>{
    debugger
    let x =  Number(value) || -1
    return IPriority[x]
}


export default class TestComponent extends React.Component<IProps, ILocalState> {
    /**
     *format: (value: number) => value.toLocaleString('en-US')
     */
    constructor(props) {
        super(props);
        this.state = {
            currentTask: {
                priority: 1,
            },
            showTask: false,
            currentIndex: -1

        }
    }    

    componentDidUpdate(newProps, _){
        const {currentIndex, currentTask} = this.state
        const newTask = newProps && newProps.tasks && newProps.tasks[currentIndex]
        
        if(newTask && !isEqual(newTask, currentTask))
            this.setState({currentTask: newTask})
    }

    

    render() {
        const { tasks } = this.props
        const { showTask, currentTask, currentIndex } = this.state
        return (<div>
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>                                    
                                ))}
                                <TableCell>
                                        
        <AddCircleOutlineIcon onClick={this.props.addNewTask}/>

                                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks && tasks.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <EditIcon  onClick={() => this.setState({ currentTask: row, showTask: true, currentIndex: index })}/>
                                            <DeleteIcon  onClick={()=>this.props.handleDeleteTask(index)}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TaskDetails
                task={currentTask}
                handleClose={() => this.setState({ showTask: false })}
                handleInputChange={(event)=>{this.props.handleInputChange(event, currentIndex)}}
                open={showTask}
                handleUpdateTask={this.props.handleUpdateTask}
                handleCreateTask={this.props.handleCreateTask}
            />
            {/* <p>{t.message}</p>
                <p>{t.priority}</p>
                <Button  variant="outlined" className={"testcss"} onClick={()=>this.setState({currentTask: t, showTask: true})}>
                Details
                </Button> */}
        </div>)
    }

}

interface IProps {
    tasks: ITask[];
    addNewTask:() => void;
    handleInputChange:(event, index) => void;
    handleUpdateTask:(task:ITask) => void;
    handleCreateTask:(task:ITask) => void;
    handleDeleteTask:(id: number) => void;
}

interface ILocalState {
    currentTask: ITask;
    showTask: boolean;
    currentIndex: number;
}