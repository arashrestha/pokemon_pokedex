import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";
import PokemonCard from './PokemonCard'
import Spinner from './Spinner'
import SearchArea from './SearchArea';
import { Card } from '@material-ui/core';

@inject('store', 'uiStore')
@observer

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mappedValue: []
        }
    }

    componentWillUpdate() {
        const { store } = this.props
        store.allPokemonData.map(pokemon => {
            let pokemonIndex = pokemon.url.split('/')[pokemon.url.split('/').length - 2]

            store.fetchPokemonSpecies(pokemonIndex)
                .then(res => {
                    pokemon.habitat = res.habitat
                })
        })
    }

    filterPokemon = (pokemons, searchValue) => {
        const { store } = this.props
        if (searchValue === 10) {
            if (store.searchByName === '') return pokemons;
            return pokemons.filter(pokemon => {
                return pokemon.name.toLowerCase().indexOf(store.searchByName.toLowerCase()) > -1;
            })


        }
        else if (searchValue === 20) {

            if (store.searchByName === '') return pokemons;
            return pokemons.filter(pokemon => {
                return pokemon.habitat.toLowerCase().indexOf(store.searchByName.toLowerCase()) > -1;
            })
        }
    }

    display = (searchValue) => {
        const { store } = this.props
        if (searchValue === 10) {
            return this.filterPokemon(store.allPokemonData, store.searchValue).map(pokemon => (
                <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} history={this.props.history} />
            ))
        }
        else if (searchValue === 20) {
            return this.filterPokemon(store.allPokemonData, store.searchValue).map(pokemon => (
                <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} history={this.props.history} />
            ))
        }
    }

    async call(genderCheck) {
        let promise = await this.props.store.fetchPokemonGender(genderCheck).then(res => this.setState({ mappedValue: res }))
        return promise
    }

    displayAccGender = (genderCheck) => {
        const { store } = this.props

        this.call(genderCheck)

        return this.filterPokemon(this.state.mappedValue, store.searchValue).map(pokemon => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} history={this.props.history} />
        ))
    }

    render() {

        const { store, children, uiStore } = this.props
        if (store.isLoading) return <Spinner />
        return (
            <Fragment>
                <div className='homepage-container'>
                    {uiStore.openSearchBar && <SearchArea history={this.props.history} />}
                    {store.allPokemonData ?
                        <Card style={{ display: 'inline-block', width: '100%', backgroundColor: '#e9e9e9', marginTop: '5px' }}>
                            {store.genderCheck === '' ? this.display(store.searchValue) : this.displayAccGender(store.genderCheck)}
                        </Card> :
                        <Spinner />}
                </div >
                {children}
            </Fragment>

        );
    }
}
export default Homepage