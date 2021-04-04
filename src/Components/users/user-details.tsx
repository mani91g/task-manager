import React from "react";
import { IUser } from "../../Types/user";

export default class UserDetails extends React.Component<IProps> {
    render(){
        const { user } = this.props
        return (<div>            
            <img
                src={user.picture}
                className={"User-image"}
                alt={user.name}
            />
            <p>{user.name}</p>
        </div>)
    }
    
}

interface IProps{
 user: IUser;       
}