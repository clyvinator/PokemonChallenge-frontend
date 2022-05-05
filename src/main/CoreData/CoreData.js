/*Fetches and displays pokemon data*/

import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../pagination/pagination";
import Modal from "../modal/modal";

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

const Stat = styled.div`
  text-align: center;
  margin-top: 0.2rem;
`;

const StatId = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
`;

const PokeName = styled(Stat)`
  font-weight: bold;
  font-size: 1.2rem;
`;

const PokeThumb = styled.div`
  margin-left: 20%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    process.env.REACT_APP_API_URL +
    "thumb/" +
    String(props.pokeId).padStart(3, "0") +
    ".png"});
  width: 60%;
  height: 60%;
  margin-bottom: 0.5rem;
  filter: saturate(1.8);
  ${Pokemon}:hover & {
    transform: scale(1.2);
  }
  transition: transform 0.2s ease;
`;

const CoreData = (props) => {
  const [coreDisplayData, setCoreDisplayData] = useState({});
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ display: false });

  const getNewPokemonData = (newPage) => {
    //Fetch pokemon data from server.
    const coreDisplayDataArray = [];

    if (props.currType) {
      fetch(
        `${process.env.REACT_APP_API_URL}getPokeData/${props.currType}?start=${
          (newPage - 1) * 10
        }&count=${10}`
      )
        .then((res) => {
          window.scrollTo({ top: 0, behavior: "smooth" }); //Scroll to top of page when new pokemon data is loaded.
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
              //Push fetched data to array and store it in state for render.
              coreDisplayDataArray.push(
                <Pokemon
                  key={res.data.pokemonList[i].id}
                  onClick={() =>
                    setModal({
                      display: true,
                      data: {
                        name: res.data.pokemonList[i].name.english,
                        id: res.data.pokemonList[i].id,
                        types: res.data.pokemonList[i].type,
                        hp: res.data.pokemonList[i].base.HP,
                        attack: res.data.pokemonList[i].base.Attack,
                        defense: res.data.pokemonList[i].base.Defense,
                        speed: res.data.pokemonList[i].base.Speed,
                      },
                    })
                  }
                >
                  <StatId>{res.data.pokemonList[i].id}</StatId>
                  <PokeThumb pokeId={res.data.pokemonList[i].id}></PokeThumb>
                  <PokeName>{res.data.pokemonList[i].name.english}</PokeName>

                  <Stat>
                    {res.data.pokemonList[i].type.map((e, i) => (
                      <span key={e}>{(i === 0 ? "" : ", ") + e}</span>
                    ))}
                  </Stat>
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
    //Fetch new pokemon data on type change.
    getNewPokemonData(1);
    setPage(1); //Reset page number to first page if type changes.
  }, [props.currType]);

  const handlePageChange = (n) => {
    //If current page number not same as clicked page number, change page.
    if (n !== page) {
      getNewPokemonData(n);
      setPage(Number(n));
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
      <Modal
        modal={modal}
        closeModal={() => setModal({ display: false })}
      ></Modal>
    </>
  );
};

export default CoreData;
