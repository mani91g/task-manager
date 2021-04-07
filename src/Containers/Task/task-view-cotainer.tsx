import React from 'react'
import TaskList from '../../Components/task/task-llst'
import { ITask } from '../../Types/task';
import * as moment from 'moment';
const axios = require('axios').default;

export default class TaskViewContainer extends React.Component<IProps, ILocalState>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        
    }

    addNewTask = () =>{
        let { tasks } = this.state
        let task:ITask = {
            priority: 1
        }
        tasks.push(task);
        this.setState({tasks})

    }

    async componentDidMount(){
        const response:any = await axios({
            url: 'https://devza.com/tests/tasks/list',
            headers: {
                "AuthToken" : "ekgyhosV1dOPpUJYDp6moly7tVPUgcrH"
            }
        });

        if(response && response.status === 200){
            const tasks:ITask[] = response.data && response.data.tasks
            this.setState({tasks})
        }
    }

    createNewTask = async (task: ITask) => {
        var form_data = this.getFormData(task)

        const response:any = await axios({
            url: 'https://devza.com/tests/tasks/create',
            method: 'post',
            data: form_data,
            headers: {
                "AuthToken" : "ekgyhosV1dOPpUJYDp6moly7tVPUgcrH"
            }
        });

        if(response && response.data.status === 'success')
            window.alert('Created new task')
        else
            window.alert('Could not create task')

    }

    updateNewTask = async (task: ITask) => {
        var form_data = this.getFormData(task)

        const response:any = await axios({
            url: 'https://devza.com/tests/tasks/update',
            method: 'post',
            data: form_data,
            headers: {
                "AuthToken" : "ekgyhosV1dOPpUJYDp6moly7tVPUgcrH"
            }
        });

        if(response && response.data.status === 'success')
            window.alert('Task Updated Successfully')
        else
            window.alert('Could not update task')

    }

    deleteTask = async (index: number) => {
        let { tasks } = this.state
        const task = tasks[index]       
        tasks.splice(index, 1)
        this.setState({tasks})

        if(!task.id){            
            return
        }

        var form_data = new FormData();
        form_data.append("taskid", task.id.toString())

        const response:any = await axios({
            url: 'https://devza.com/tests/tasks/delete',
            method: 'post',
            data: form_data,
            headers: {
                "AuthToken" : "ekgyhosV1dOPpUJYDp6moly7tVPUgcrH"
            }
        });

        if(response && response.data.status === 'success'){
            window.alert('Task Deleted Successfully')
            tasks.splice(index, 1)
            this.setState({tasks})
        }            
        else
            window.alert('Could not delete task')
    }

    getFormData = object => Object.keys(object).reduce((formData, key) => {
        if(key === 'id')
            formData.append('taskid', object[key]);
        else if(key == "due_date")
            formData.append(key, moment(object[key]).format('YYYY-MM-DD HH:mm:ss'));
        else
            formData.append(key, object[key]);
        return formData;
    }, new FormData());

    handleInputChange = (event, index) => {
        const name = event.currentTarget.id;
        const value = event.currentTarget.value;
        let {tasks} = this.state

        tasks[index] = {
            ...tasks[index],
            [name]: value
        }

        this.setState({tasks})
    }

    render(){
        const {tasks} = this.state
        return(
            <TaskList
            tasks={tasks}
            addNewTask={this.addNewTask}
            handleInputChange={this.handleInputChange}
            handleUpdateTask={this.updateNewTask}
            handleCreateTask={this.createNewTask}
            handleDeleteTask={this.deleteTask}
            />)
    }
}

interface IProps{

}

interface ILocalState{
    tasks: ITask[]
}