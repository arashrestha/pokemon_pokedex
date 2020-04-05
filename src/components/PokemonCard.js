import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Spinner from './Spinner'

import { appStyles } from "../muiStyles";

@inject('store', 'uiStore')
@observer

class PokemonCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageURL: '',
            pokemonIndex: '',
            imageLoading: true,
        }
    }

    componentDidMount() {
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name,
            imageURL,
            pokemonIndex,
        })
    }

    render() {
        const { classes, history } = this.props;
        const { name, imageURL, pokemonIndex, imageLoading } = this.state
        return (
            <div class='card-container'>
                <Card className={classes.cardWidth} onClick={() => history.push(`/pokemon/${pokemonIndex}`)} >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                        >{imageLoading ? <Spinner /> : null}
                            <img onLoad={() => this.setState({ imageLoading: false })} src={imageURL} alt={name} height='110' width='100' />
                        </CardMedia>
                        <CardContent style={{ textAlign: 'center', padding: '5px' }}>
                            <h3 style={{ fontFamily: 'Roboto', letterSpacing: '1px', padding: '5px' }}>
                                {name.toLowerCase()
                                    .split(' ')
                                    .map(
                                        letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                    )
                                    .join(' ')}
                            </h3>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
export default withStyles(appStyles, { withTheme: true })(PokemonCard)