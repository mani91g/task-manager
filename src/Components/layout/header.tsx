import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom'

class Header extends React.Component <_, ILocalState>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state= {
            showMenu: false
        }
        
    }

    navigateTo = (link: string) => {
        this.setState({showMenu: false})
        this.props.history.push(link)
    }

    render() {
        const { showMenu } = this.state
        return (
            <div>
                <AppBar className={"app-bar"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon onClick={()=> this.setState({showMenu: !showMenu})}/>
                        </IconButton>
                        <Typography variant="h6">
                            Task Manager
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={showMenu}                    
                >
                    <List>
                        <ListItem button onClick={()=>this.navigateTo('/task')}>
                            <ListItemText primary="Task" />
                        </ListItem>
                        <ListItem button onClick={()=>this.navigateTo('/user')}>
                            <ListItemText primary="User" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>)
    }
}
export default withRouter(Header)

interface ILocalState{
    showMenu: boolean;
}