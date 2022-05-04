import styled from "styled-components";
import Pokeball from "./Pokeball/Pokeball";

const StyledHeader = styled.header`
  width: 100%;
  height: 4.2rem;
  line-height: 4.2rem;
  font-size: 3.8rem;
  text-align: center;
  background-color: #6f6f6f;
  color: white;
`;

const HeaderContainer = styled.div`
  height: 3rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Pokeball />
      Pok&eacute;mon
    </StyledHeader>
  );
};

export default Header;
