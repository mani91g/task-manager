import React from 'react'
import { IUser } from "../../Types/user";
import UserList from '../../Components/users/user-list'
import axios from 'axios'

export default class UserViewContainer extends React.Component<{}, ILocalState>{
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    async componentDidMount(){
        const response:any = await axios({
            url: 'https://devza.com/tests/tasks/listusers',
            headers: {
                "AuthToken" : "ekgyhosV1dOPpUJYDp6moly7tVPUgcrH"
            }
        });

        if(response && response.status === 200){
            const users:IUser[] = response.data && response.data.users
            this.setState({users})
        }
    }

    render(){
        return(
            <UserList
             users={this.state.users}
            />
        )
    }
}
interface IProps{

}

interface ILocalState{
    users:IUser[]
}