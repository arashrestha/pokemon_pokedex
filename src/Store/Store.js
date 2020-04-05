import { observable, action } from 'mobx'
import { BaseURL } from '../config/config.js'

class Store {
    @observable allPokemonData = []
    @observable isLoading = false
    @observable pokemonData = []
    @observable pokemonMoveDetails = []
    @observable searchByName = ''
    @observable searchValue = 10
    @observable genderCheck = ''

    @action fetchAll() {
        this.isLoading = true
        fetch(`${BaseURL}/pokemon?limit=200`)
            .then(response => response.json())
            .then(res => {
                if (res) {
                    this.isLoading = false
                    this.allPokemonData = res.results
                }
            }).catch(err => {
                console.log(err);
            });
    }

    @action fetchPokemonData(pokemonIndex) {

        return new Promise(resolve => {
            fetch(`${BaseURL}/pokemon/${pokemonIndex}/`)
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        this.pokemonData = res
                        resolve(res)
                    }
                })
        })
    }

    @action fetchPokemonSpecies(pokemonIndex) {

        return new Promise(resolve => {
            fetch(`${BaseURL}/pokemon-species/${pokemonIndex}`)
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        let description = '';
                        res.flavor_text_entries.some(flavor => {
                            if (flavor.language.name === 'en') {
                                description = flavor.flavor_text;
                                return;
                            }
                        });
                        const femaleRate = res['gender_rate'];
                        const genderRatioFemale = 12.5 * femaleRate;
                        const genderRatioMale = 12.5 * (8 - femaleRate)
                        const catchRate = Math.round((100 / 255) * res.capture_rate);
                        const eggGroups = res['egg_groups'].map(group => {
                            return group.name.toLowerCase()
                                .split(' ')
                                .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                        }).join(', ')

                        const hatchSteps = 255 * (res['hatch_counter'] + 1);
                        const habitat = res.habitat ? res.habitat.name : ''
                        const evolves_from = res.evolves_from_species ? { url: res.evolves_from_species.url, name: res.evolves_from_species.name } : ''
                        let data = {
                            description,
                            genderRatioMale,
                            genderRatioFemale,
                            catchRate,
                            eggGroups,
                            hatchSteps,
                            habitat,
                            evolves_from
                        }
                        resolve(data)
                    }
                })
        })
    }

    @action fetchPokemonMoves(url) {
        this.pokemonMoveDetails = []
        this.pokemonMoveDetails.length === 0 && fetch(url)
            .then(response => response.json())
            .then(res => {
                if (res) {
                    let moveDetail = {
                        accuracy: res.accuracy,
                        name: res.name,
                        power: res.power,
                        pp: res.pp,
                        description: res.effect_entries[0].effect,
                        type: res.type.name,
                        show: false
                    }
                    this.pokemonMoveDetails = [...this.pokemonMoveDetails, moveDetail]
                }
            })
    }

    @action fetchPokemonGender(gender) {

        return new Promise(resolve => {

            fetch(`${BaseURL}/gender/${gender}`)
                .then(response => response.json())
                .then(res => {
                    let allPokemonData = this.allPokemonData
                    let pokemon = []
                    allPokemonData.filter(function (data) {

                        return res.pokemon_species_details.filter(function (species) {
                            if (data.name === species.pokemon_species.name)
                                pokemon.push({
                                    ...data
                                })
                        })
                    })
                    resolve(pokemon)
                })
        })
    }


    onChangeSearchByName = (e) => {
        this.searchByName = e.target.value
    }

    onChangeSearchValue = (e) => {
        this.searchValue = e.target.value
    }
    onChangeGenderValue = (e) => {
        console.log(e)
        this.genderCheck = e.target.value
    }

    clearSearchValues() {
        this.searchByName = ''
        this.searchValue = 10
        this.genderCheck = ''
    }


}

export default Store

