import React from "react";
import UserDetails from './user-details'
import {IUser} from '../../Types/user'

export default class UserList extends React.Component<IProps> {
    render(){
        const { users } = this.props
        return (<div>
            <h4>The Team</h4>
            {
                users && users.map(u => (
                    <UserDetails
                        user={u}
                    />
                ))
            }
        </div>)
    }
    
}

interface IProps{
 users: IUser[];
}