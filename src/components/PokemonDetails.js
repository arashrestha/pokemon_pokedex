import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Card } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { Arrow } from '../config/config'
let i
@inject('store', 'uiStore')
@observer

class PokemonDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pokemonIndex: '',
            imageURL: '',
            types: [],
            description: '',
            stats: {
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                specialAttack: '',
                specialDefense: ''
            },
            height: '',
            weight: '',
            eggGroups: '',
            abilities: '',
            genderRatioFemale: '',
            genderRatioMale: '',
            evs: '',
            hatchSteps: '',
            catchRate: '',
            evolves_from: { name: '', img: '', index: '' },
            show: false,
            moveName: ''
        }
    }

    componentDidMount() {
        const { store } = this.props
        store.fetchPokemonData(this.props.match.params.pokemonIndex)
            .then(res => {
                if (res) {
                    const pokemonIndex = this.props.match.params.pokemonIndex
                    const name = res.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                    const imageURL = res.sprites.front_default
                    let { hp, attack, defense, speed, specialAttack, specialDefense } = ''
                    res.stats.map(stat => {
                        switch (stat.stat.name) {
                            case 'hp':
                                hp = stat['base_stat'];
                                break;
                            case 'attack':
                                attack = stat['base_stat'];
                                break;
                            case 'defense':
                                defense = stat['base_stat'];
                                break;
                            case 'speed':
                                speed = stat['base_stat'];
                                break;
                            case 'special-attack':
                                specialAttack = stat['base_stat'];
                                break;
                            case 'special-defense':
                                specialDefense = stat['base_stat'];
                                break;
                        }
                    });

                    const height = res.height / 10
                    const weight = res.weight / 10

                    const types = res.types.map(type => type.type.name)

                    const abilities = res.abilities.map(ability => {
                        return ability.ability.name.toLowerCase()
                            .split('-')
                            .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

                    }).join(', ')

                    const evs = res.stats.filter(stat => {
                        if (stat.effort > 0) {
                            return true;
                        }
                        return false;
                    }).map(stat => {
                        return `${stat.effort} ${stat.stat.name}`.toLowerCase()
                            .split('-')
                            .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                    }).join(', ')

                    res.moves.map(move => {
                        store.fetchPokemonMoves(move.move.url)
                    })

                    this.setState({
                        imageURL,
                        name,
                        pokemonIndex,
                        types,
                        stats: {
                            hp,
                            attack,
                            specialDefense,
                            specialAttack,
                            defense,
                            speed,
                        },
                        height,
                        weight,
                        abilities,
                        evs,
                    })
                }
            })

        store.fetchPokemonSpecies(this.props.match.params.pokemonIndex)
            .then(res => {
                if (res) {
                    let evolves_from_img, name, pokemonIndex
                    if (typeof (res.evolves_from) === 'object') {
                        pokemonIndex = res.evolves_from.url.split('/')[res.evolves_from.url.split('/').length - 2]
                        evolves_from_img = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
                        name = res.evolves_from && res.evolves_from.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                    }
                    this.setState({
                        description: res.description,
                        genderRatioMale: res.genderRatioMale,
                        genderRatioFemale: res.genderRatioFemale,
                        catchRate: res.catchRate,
                        eggGroups: res.eggGroups,
                        hatchSteps: res.hatchSteps,
                        evolves_from: { name: name, img: evolves_from_img, index: pokemonIndex }
                    })
                }
            })

    }

    getTypeColor = (type) => {
        switch (type) {
            case 'bug': i = '#b1c12e'
                break;
            case 'poison': i = '#934594'
                break;
            case 'dark': i = '#4f3a2d'
                break;
            case 'dragon': i = '#755edf'
                break;
            case 'electric': i = '#fcbc17'
                break;
            case 'fairy': i = '#f4b1f4'
                break;
            case 'fighting': i = '#ae2a24'
                break;
            case 'fire': i = '#e73b0c'
                break;
            case 'flying': i = '#a3b3f7'
                break;
            case 'ghost': i = '#6060b2'
                break;
            case 'grass': i = '#74c236'
                break;
            case 'ground': i = '#d3b357'
                break;
            case 'ice': i = '#a3e7fd'
                break;
            case 'normal': i = '#cbc4bc'
                break;
            case 'psychic': i = '#ed4882'
                break;
            case 'rock': i = '#b9a156'
                break;
            case 'steel': i = '#b5b5c3'
                break;
            case 'water': i = '#3295f6'
                break;
        }
        return i;
    }
    onEvolution = (evolves_from) => {
        this.props.history.push(`/pokemon/${evolves_from}`)
        window.location.reload()
    }

    onChangeMoveName = (e) => {
        this.setState({ moveName: e.target.value })
    }

    filterMoves = (moves) => {
        const { moveName } = this.state

        if (moveName === '') return moves;
        return moves.filter(move => {
            return move.name.toLowerCase().indexOf(moveName.toLowerCase()) > -1;
        })
    }
    render() {
        const { store } = this.props
        const { name, moveName, pokemonIndex, imageURL, types, evolves_from, description, height, stats, weight, catchRate, eggGroups, abilities, genderRatioFemale, genderRatioMale, evs, hatchSteps } = this.state
        return (
            <div className='card-container' style={{ float: 'none' }}>
                <Card>
                    <div className='class-header' style={{ padding: '10px', backgroundColor: '#F4F4F4' }}>
                        <h2 style={{ display: 'inline' }}>#{pokemonIndex}</h2>
                        {
                            types.map((type, index) => {
                                return (
                                    <Chip label={type.toLowerCase()
                                        .split('-')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                        key={index + 1} style={{ backgroundColor: this.getTypeColor(type), marginRight: '5px', float: 'right', height: '25px', color: 'white' }} />
                                )
                            })
                        }
                    </div>
                    <div className='card-body' style={{ padding: '10px' }}>
                        <div>
                            <div className='image-container'>
                                <img src={imageURL} alt={name} height='200px' />
                            </div>
                            <div className='status-container'>
                                <h2>{name}
                                </h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>HP</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.hp} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.hp}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Attack</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.attack} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.attack}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Defense</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.defense} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.defense}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Speed</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.speed} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.speed}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Special Attack</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.specialAttack} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.specialAttack}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Special Defense</td>
                                            <td>
                                                <progress id='linaer' max='100' value={stats.specialDefense} style={{ minWidth: '400px', backgroundColor: 'green' }} ></progress> &nbsp;<span>{stats.specialDefense}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                        <div className='description'>
                            <p> <label>Description:  </label><br />{description}</p>
                        </div>
                        <hr />
                        <div className='profile-container'>
                            <h3 style={{ textAlign: 'center', padding: '10px', backgroundColor: '#F4F4F4' }}>Profile</h3>
                            <div style={{ width: '50%' }}>
                                <table style={{ float: 'left', width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Height: </td>
                                            <td style={{ textAlign: 'center' }}>{height}m</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Weight: </td>
                                            <td style={{ textAlign: 'center' }}>{weight}kg</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Catch Rate: </td>
                                            <td style={{ textAlign: 'center' }}>{catchRate}%</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Gender Ratio: </td>
                                            <td style={{ textAlign: 'center' }}>{genderRatioMale}% ♂️  {genderRatioFemale}% ♀️</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ float: 'left', width: '50%' }}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Egg Groups: </td>
                                            <td style={{ textAlign: 'center' }}>{eggGroups}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Hatch Steps: </td>
                                            <td style={{ textAlign: 'center' }}>{hatchSteps}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>Abilities: </td>
                                            <td style={{ textAlign: 'center' }}>{abilities}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right' }}>EVs: </td>
                                            <td style={{ textAlign: 'center' }}>{evs}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {evolves_from.name && evolves_from.img &&
                            <Fragment>
                                <hr />
                                <div className='evolution-container'>
                                    <h3 style={{ textAlign: 'center', padding: '10px', backgroundColor: '#F4F4F4' }}>Evolution</h3>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={evolves_from.img} alt={evolves_from.name} height='150' style={{ cursor: 'pointer' }}
                                            onClick={() => this.onEvolution(evolves_from.index)} />
                                        <img src={Arrow} height='40' alt='arrow' style={{ paddingBottom: '50px' }} />
                                        <img src={imageURL} alt={name} height='150' />
                                        <p><b>{name}</b> evolves from<b> {evolves_from.name}</b> </p>
                                    </div>
                                </div>
                            </Fragment>}
                        <hr />
                        <div className='move-container'>
                            <div className='move-container-head' >
                                <h3  >Moves</h3>
                                <input style={{ position: 'absolute', right: '5px', top: '10px', border: 'none', borderRadius: '14px' }} placeholder='Search Moves' type='search' value={moveName} onChange={this.onChangeMoveName} />
                            </div>
                            <div>
                                <table style={{ width: '100%', padding: '0 150px' }} border='0' cellSpacing='0' cellPadding='0'>
                                    <tbody>
                                        {this.filterMoves(store.pokemonMoveDetails).sort((a, b) => a.name < b.name ? -1 : 1).map((detail, index) => (
                                            <Fragment>
                                                <tr key={index + 1} style={{ backgroundColor: this.getTypeColor(detail.type) }} onClick={() => detail.show = !detail.show}>
                                                    <td style={{ textAlign: 'center', padding: '4px' }}>{detail.name.toLowerCase()
                                                        .split(' ')
                                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} </td>
                                                    <td style={{ textAlign: 'center', padding: '4px' }}>{detail.type.toLowerCase()
                                                        .split('-')
                                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</td>
                                                </tr>
                                                <Fragment>{detail.show && <div>
                                                    <p>{detail.description}</p>
                                                    <p>
                                                        <span style={{ paddingRight: '40px' }}>Power: {detail.power ? detail.power : 'N/A'}</span>
                                                        <span style={{ paddingRight: '40px' }}>PP: {detail.pp ? detail.pp : 'N/A'}</span>
                                                        <span>Accuracy: {detail.accuracy ? `${detail.accuracy}%` : 'N/A'}</span>
                                                    </p>
                                                </div>}</Fragment>
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </Card>
            </div >
        );
    }
}

export default PokemonDetails