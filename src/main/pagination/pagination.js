import styled from "styled-components";

const PaginationContainer = styled.div`
  height: 3rem;
  width: 100%;
  background-color: red;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1.5px solid #afafaf;
  position: relative;
`;

const PaginactionControls = styled.div`
  position: absolute;
  height: 2rem;
  width: 100%;
  max-width: 40rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const PageNumber = styled.button`
  display: block;
  color: ${(props) => (props.active ? "black" : "white")};
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  border: 1.5px solid #afafaf;
  text-align: center;
`;

const Pagination = ({ maxCount, page, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(maxCount / 10.0); i++) {
    pageNumbers.push(
      <PageNumber
        active={Number(page) === i + 1 ? true : false}
        value={i + 1}
        key={Date.now() + i}
        onClick={handlePageChange}
      >
        {i + 1}
      </PageNumber>
    );
  }
  return (
    <PaginationContainer>
      <PaginactionControls>{pageNumbers}</PaginactionControls>
    </PaginationContainer>
  );
};

export default Pagination;
