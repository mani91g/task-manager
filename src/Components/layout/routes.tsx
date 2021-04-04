import User from '../../Containers/User/user-view-container';
import TaskViewer from '../../Containers/Task/task-view-cotainer'

export const routes =[
    {path : "/user", component: User, exact: true},
    {path : "/task", component: TaskViewer, exact: true},
]