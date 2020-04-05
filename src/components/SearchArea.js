import React, { Component, Fragment } from "react";
import { TextField, InputLabel, Select, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core'
import { appStyles } from "../muiStyles";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'


@inject('store', 'uiStore')
@observer
class SearchArea extends Component {


    onClear = () => {
        this.props.store.clearSearchValues()
        this.props.history.push('/homepage')
    }

    render() {

        const { store, classes } = this.props


        return (
            <Fragment>
                <div className='search-container'>
                    <TextField id="outlined-search" label=" 🔍 Search" type="search" variant='outlined'
                        className={classes.input}
                        style={{ backgroundColor: '#E9E9E9' }}
                        value={store.searchByName}
                        onChange={store.onChangeSearchByName}
                    />
                    <br /><br />
                    <FormControl style={{ backgroundColor: '#E9E9E9' }}
                        variant="outlined" className={classes.input}>
                        <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                        <Select
                            id="demo-simple-select-outlined"
                            value={store.searchValue}
                            onChange={store.onChangeSearchValue}
                            style={{ width: '100%' }}
                        >
                            <option value={10}>Name</option>
                            <option value={20}>Habitat</option>

                        </Select>
                    </FormControl>
                    {
                        store.searchValue === 10 &&
                        <Fragment>
                            <br /><br />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup style={{ display: 'inline-block' }} aria-label="gender" name="gender1" value={store.genderCheck} onChange={store.onChangeGenderValue}>
                                    <FormControlLabel value="male" style={{ float: 'left' }} control={<Radio style={{ color: '#ef5350' }} />} label="Male" />
                                    <FormControlLabel value="female" style={{ float: 'left' }} control={<Radio style={{ color: '#ef5350' }} />} label="Female" />
                                    <FormControlLabel value="genderless" style={{ float: 'left' }} control={<Radio style={{ color: '#ef5350' }} />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Fragment>
                    }
                    <br /><br />
                    <Button style={{ color: '#ef5350' }} variant="outlined" onClick={this.onClear}>
                        Clear
                        </Button>
                </div>

            </Fragment >
        );
    }
}

export default withStyles(appStyles, { withTheme: true })(SearchArea)