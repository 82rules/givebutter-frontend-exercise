import {useEffect, useMemo, useState} from "react";
import {fetchAllPokemon, fetchPokemonSpeciesByName, fetchPokemonDetailsByName, fetchEvolutionChainById} from "./api";

function App() {
    const [pokemon, setPokemon] = useState([])
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState(null)

    useEffect(async () => {
        const {results: pokemonList} = await fetchAllPokemon()
        setPokemon(pokemonList)
    }, [])

    const extractChainFromTree = (source, value)  => {
        if (source.species && source.species.name) {
            value.push(source.species.name);
            if (Array.isArray(source.evolves_to) && !!source.evolves_to[0]) {
                extractChainFromTree(source.evolves_to[0], value);
            }
        }
        return value;
    }

    const onGetDetails =  (name) => async () => {
        setLoadingDetails(true);
        setPokemonDetails(null);

        const [details, species] = await Promise.all([
            fetchPokemonDetailsByName(name),
            fetchPokemonSpeciesByName(name)
        ]);

        const id = species.evolution_chain.url.replace(/.*\/([\d]+)\/$/, '$1');
        const chainData = await fetchEvolutionChainById(id);
        const chain = [];

        extractChainFromTree(chainData.chain.evolves_to[0], chain)

        const monsterDetails = {
            name,
            types: details.types.slice(0,4).map((item => item.type.name)),
            moves: details.moves.slice(0,4).map((item => item.move.name)),
            evolutions: chain.slice(0,3)
        }
        setLoadingDetails(false);
        setPokemonDetails(monsterDetails);
    }

    const renderList = useMemo(() => {
        if (searchValue.length > 0) {
            const exp = new RegExp(`${searchValue}`, 'ig')
            return pokemon.filter(f => f.name.match(exp));
        }
        return pokemon;
    }, [searchValue, pokemon]);

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {renderList.length > 0 ? (
                    <div className={'pokedex__search-results'}>
                        {
                            renderList.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div>No Results Found</div>
                )}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            <strong>{ pokemonDetails.name }</strong>
                            <div className={'pokedex__lists'}>
                                <div className={'pokedex__list'}>
                                    <strong>Types</strong>
                                    <ul>
                                        {pokemonDetails.types.map(type => (
                                            <li key={type}>{type}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className={'pokedex__list'}>
                                    <strong>Moves</strong>
                                    <ul>
                                        {pokemonDetails.moves.map(move => (
                                            <li key={move}>{move}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <strong>Evolutions</strong>
                            <div className={'pokedex__bottom'}>
                                {pokemonDetails.evolutions.map(stage => (
                                        <span key={stage}>{stage}</span>
                                    )
                                )}
                            </div>
                        </div>
                    )
                }
                {
                    loadingDetails && (
                        <div className={'pokedex__details'}>
                            loading...
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
