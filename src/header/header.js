import styled from "styled-components";
import Pokeball from "./pokeball/pokeball.js";

const StyledHeader = styled.header`
  width: 100%;
  height: 4.2rem;
  line-height: 4rem;
  font-size: 3rem;
  text-align: center;
  background-color: #6f6f6f;
  color: white;
`;

const Title = styled.span`
  vertical-align: top;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Pokeball />
      <Title>Pok&eacute;mon</Title>
    </StyledHeader>
  );
};

export default Header;
