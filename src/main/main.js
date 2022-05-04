import styled from "styled-components";
import { useState, useEffect } from "react";
import CoreData from "./coredata/coredata";

const StyledMain = styled.main`
  min-height: calc(100vh - 8rem);
  margin: 2rem;
  margin-bottom: 1rem;
  border: 1px solid #afafaf;
  border-radius: 15px;
  box-shadow: -3px 3px 6px 2px #afafaf;
`;

const TypeSelectorStrip = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #ff1c1c;
  text-align: center;
  font-size: 1.3rem;
  border: 1.5px solid #afafaf;
  border-radius: 15px 15px 0 0;
  position: relative;
`;

const TypeSelectionContainer = styled.div`
  height: 2rem;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TypeSelection = styled.select`
  width: 8rem;
  text-align: center;
  margin-left: 1rem;
  height: 2rem;
  font-size: inherit;
  border: 1.5px solid #ff1c1c;
  outline: 1.5px solid white;
  border-radius: 15px;
  color: #6f6f6f;
`;

const TypeSelectionLabel = styled.label`
  color: white;
`;

const Main = () => {
  const [pokeTypes, setPokeTypes] = useState([]);
  const [currType, setCurrType] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/getPokeTypes")
      .then((res) => {
        if (res.ok) return res.json();
        else {
          throw new Error("Could not fetch");
        }
      })
      .then((res) => {
        if (
          res.success &&
          res.data &&
          res.data instanceof Array &&
          res.data.length > 0
        ) {
          setPokeTypes(res.data);
          setCurrType(res.data[0].english);
        } else {
          throw new Error("Error fetching pokemon types");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <StyledMain>
      <TypeSelectorStrip>
        <TypeSelectionContainer>
          <TypeSelectionLabel htmlFor="type-selection">Type</TypeSelectionLabel>
          <TypeSelection
            id="type-selection"
            onChange={(e) => setCurrType(e.target.value)}
            value={currType ?? ""}
          >
            {pokeTypes.map((ele) => (
              <option key={ele.english}>{ele.english}</option>
            ))}
          </TypeSelection>
        </TypeSelectionContainer>
      </TypeSelectorStrip>
      <CoreData currType={currType} />
    </StyledMain>
  );
};

export default Main;
