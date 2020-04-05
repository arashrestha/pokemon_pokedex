import React, { Component } from 'react';
import App from './App'
import { Route, Router } from './components/reactRouter'
import Homepage from './components/Homepage'
import PokemonDetails from './components/PokemonDetails'


class Routes extends Component {
    render() {

        return (
            <div className='full-container'>
                <Router>
                    <Route path='/' component={App} indexRedirectTo='/homepage'
                    >
                        <Route path='/homepage' component={Homepage} />
                        <Route path='/pokemon/:pokemonIndex' component={PokemonDetails} />
                        <Route path='/*' component={() => <div>Page not found</div>} />
                    </Route>
                </Router>
            </div>
        );
    }
}

export default Routes;
