/*Displays extended pokemon data when user clicks on a pokemon*/

import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  z-index: 100;
`;

const TextContainer = styled.div`
  height: 40%;
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 3rem;
  margin-top: 1rem;
`;

const PowerStat = styled.div`
  display: inline-block;
  flex-basis: 50%;
`;

const StatContainer = styled.div`
  height: 30%;
  margin-top: 3rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 3rem;
  text-align: center;
  align-content: space-between;
  font-size: 2rem;
`;

const Image = styled.div`
  background-image: url(${(props) =>
    process.env.REACT_APP_API_URL +
    "image/" +
    String(props.pokeId).padStart(3, "0") +
    ".png"});
  width: 60%;
  height: 60%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 20%;
`;

const Name = styled.div`
  height: 10%;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`;

const Modal = ({ modal, closeModal }) => {
  return modal.display ? (
    <StyledModal onClick={closeModal}>
      <Image pokeId={modal.data.id}></Image>
      <TextContainer>
        <Name>{modal.data.name}</Name>
        <StatContainer>
          <PowerStat>HP:{" " + modal.data.hp}</PowerStat>
          <PowerStat>Attack:{" " + modal.data.attack}</PowerStat>
          <PowerStat>Defense:{" " + modal.data.defense}</PowerStat>
          <PowerStat>Speed:{" " + modal.data.speed}</PowerStat>
        </StatContainer>{" "}
      </TextContainer>
    </StyledModal>
  ) : (
    ""
  );
};

export default Modal;
