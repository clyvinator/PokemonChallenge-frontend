import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../pagination/pagination";

const PokemonContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 14rem);
  padding: 1rem;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

const Pokemon = styled.div`
  flex-basis: auto;
  width: 15rem;
  height: 16rem;
  background-color: #6f6f6f;
  padding: 1rem;
  border-radius: 15px;
  margin: 0.5rem;
  color: white;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: -3px 3px 6px 2px #afafaf;
  }
  transition: box-shadow 0.2s ease;
`;

const StatContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const Stat = styled.div`
  text-align: center;
  margin-top: 0.2rem;
`;

const StatId = styled.div`
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
`;

const PokeName = styled(Stat)`
  font-weight: bold;
  font-size: 1.2rem;
`;

const PokeThumb = styled.div`
  transform: translate(50%, 0);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    "http://localhost:3030/thumb/" +
    String(props.pokeId).padStart(3, "0") +
    ".png"});
  width: 50%;
  height: 50%;
  margin-bottom: 0.5rem;
  filter: saturate(1.8);
`;

const PowerStat = styled(Stat)`
  display: inline-block;
  flex-basis: 50%;
`;

const CoreData = (props) => {
  const [coreDisplayData, setCoreDisplayData] = useState({});
  const [page, setPage] = useState(1);
  const coreDisplayDataArray = [];

  const getNewPokemonData = (newPage) => {
    if (props.currType) {
      fetch(
        `http://localhost:3030/getPokeData/${props.currType}?start=${
          (newPage - 1) * 10
        }&count=${10}`
      )
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
                  <StatId>{res.data.pokemonList[i].id}</StatId>
                  <PokeThumb pokeId={res.data.pokemonList[i].id}></PokeThumb>
                  <PokeName>{res.data.pokemonList[i].name.english}</PokeName>

                  <Stat>
                    {res.data.pokemonList[i].type.map((e, i) => (
                      <span key={e}>{(i === 0 ? "" : ", ") + e}</span>
                    ))}
                  </Stat>

                  <StatContainer>
                    <PowerStat>
                      HP:{" " + res.data.pokemonList[i].base.HP}
                    </PowerStat>
                    <PowerStat>
                      Attack:{" " + res.data.pokemonList[i].base.Attack}
                    </PowerStat>
                    <PowerStat>
                      Defense:{" " + res.data.pokemonList[i].base.Defense}
                    </PowerStat>
                    <PowerStat>
                      Speed:{" " + res.data.pokemonList[i].base.Speed}
                    </PowerStat>
                  </StatContainer>
                </Pokemon>
              );
            }
            setCoreDisplayData({
              maxCount: res.data.maxCount,
              data: coreDisplayDataArray,
            });
          } else {
            throw new Error("Error fetching pokemon data");
          }
        })
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    getNewPokemonData(1);
    setPage(1);
  }, [props.currType]);

  const handlePageChange = (e) => {
    if (e.target.value !== page) {
      getNewPokemonData(e.target.value);
      setPage(e.target.value);
    }
  };

  return (
    <>
      <PokemonContainer>{coreDisplayData.data}</PokemonContainer>
      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        maxCount={coreDisplayData.maxCount}
      ></Pagination>
    </>
  );
};

export default CoreData;
