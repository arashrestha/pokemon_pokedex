import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { appStyles } from "../muiStyles";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'
import { ArrowBackIos } from '@material-ui/icons'
import { PokeDex, Pokeball } from '../config/config'

@inject('store', 'uiStore')
@observer
class DrawerMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openSearch: false
        }
    }

    clear = () => {
        const { store, uiStore, history } = this.props
        store.clearSearchValues()
        uiStore.toggleSearch(!uiStore.openSearchBar)
        uiStore.toggleDrawer(false)
        history.push('/homepage')
    }
    render() {
        const { uiStore, classes, store } = this.props;


        return (
            <div
                className={classes.list}
                role="presentation"
            >
                <div style={{ display: 'inline-block', width: '100%' }} >
                    <img src={PokeDex} height='50' width='50' alt='pokedex' style={{ float: 'left', paddingRight: '10px' }} />
                    <h2 style={{ textAlign: 'center', float: 'left', color: '#ff3838', margin: '0', fontSize: '36px' }}> Pokédex</h2>
                    <IconButton style={{ float: 'right' }} onClick={this.props.uiStore.toggleDrawer(false)}><ArrowBackIos /></IconButton>
                </div>

                <List>
                    <ListItem button key='Home'
                        onClick={this.clear}>
                        <ListItemText style={{ color: '#ff3838', fontSize: '24px' }}>
                            <img src={Pokeball} alt='pokeball' height='20' width='20' style={{ float: 'left', paddingRight: '10px', paddingTop: '5px' }} />
                            <span style={{ fontSize: '22px' }}>Home</span>
                        </ListItemText>
                    </ListItem>
                </List>

            </div >)
    }
}

export default withStyles(appStyles, { withTheme: true })(DrawerMenu)