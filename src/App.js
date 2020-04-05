import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Drawer,
  Button,
  Typography,

} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {
  Search,
  Menu as MenuIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import { appStyles } from "./muiStyles";
import DrawerMenu from "./components/DrawerMenu"

@inject('store', 'uiStore')
@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentWillMount() {
    const { store } = this.props
    if (store.allPokemonData.length === 0) store.fetchAll()
  }

  clear = () => {
    this.props.store.clearSearchValues()
    this.props.history.push('/homepage')
  }

  _renderAppBar = (classes) => {
    return (<AppBar
      position="fixed"
      className={classNames(classes.appBar, {
      })}
    >
      <Toolbar className={classes.toolbar}>
        {
          <Fragment>
            <Button className={classes.button} style={{ color: 'white' }} onClick={this.props.uiStore.toggleDrawer(true)}>
              <MenuIcon className={classes.leftIcon} />
            </Button>
          </Fragment>
        }
        <Typography data-toggle='tooltip' title='Home' variant="h6" color="inherit" className={classes.grow} noWrap
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '26px', cursor: 'pointer' }}
          onClick={this.clear} >
          Pokédex
        </Typography>
        <Fragment>
          <Button className={classes.button} style={{ color: 'white' }} onClick={() => this.props.uiStore.toggleSearch(!this.props.uiStore.openSearchBar)}>
            <Search className={classes.leftIcon} />
          </Button>
        </Fragment>
      </Toolbar>
    </AppBar >)
  };

  sideList = () => <DrawerMenu history={this.props.history} />

  render() {
    const { classes, children, uiStore } = this.props;
    return (
      <div className="main">
        {this._renderAppBar(classes)}
        <Drawer open={uiStore.openDrawer} onClose={uiStore.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
        <main id='main-content-element' className={classNames(classes.content)}>
          {children}
        </main>
      </div >
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default withStyles(appStyles, { withTheme: true })(App);

