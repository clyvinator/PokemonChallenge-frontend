import { useEffect, useState } from "react";
import styled from "styled-components";

const PokemonContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 14rem);
  padding: 2rem;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
const Pokemon = styled.div`
  flex-basis: auto;
  min-width: 15rem;
  height: 15rem;
  background-color: #6f6f6f;
  padding: 1rem;
  border-radius: 15px;
  margin: 0.5rem;
`;

const CoreData = (props) => {
  const [coreDisplayData, setCoreDisplayData] = useState([]);
  const coreDisplayDataArray = [];
  useEffect(() => {
    if (props.currType) {
      fetch(`http://localhost:3030/getPokeData/${props.currType}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Could not fetch");
          }
        })
        .then((res) => {
          if (
            res.success &&
            res.data &&
            res.data.pokemonList &&
            res.data.pokemonList instanceof Array
          ) {
            for (let i = 0; i < res.data.pokemonList.length; i++) {
              coreDisplayDataArray.push(
                <Pokemon key={res.data.pokemonList[i].id}>
                  <div>{res.data.pokemonList[i].id}</div>
                  <div>{res.data.pokemonList[i].name.english}</div>
                  <div>{res.data.pokemonList[i].type}</div>
                  <div>{res.data.pokemonList[i].base.HP}</div>
                  <div>{res.data.pokemonList[i].base.Attack}</div>
                  <div>{res.data.pokemonList[i].base.Defense}</div>
                  <div>{res.data.pokemonList[i].base.Speed}</div>
                </Pokemon>
              );
            }
            setCoreDisplayData(coreDisplayDataArray);
          } else {
            throw new Error("Error fetching pokemon data");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [props.currType]);
  return <PokemonContainer>{coreDisplayData}</PokemonContainer>;
};

export default CoreData;
