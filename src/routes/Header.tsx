import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  padding: 8px 20px;
  border-bottom: 1px solid #fff;
  backdrop-filter: blur(2px);
  z-index: 10;
  a {
    font-size: 24px;
    font-weight: 900;
    z-index: 11;
  }
`;

function Header() {
  return (
    <HeaderWrap>
      <h1>
        <Link to="/">cocoIn</Link>
      </h1>
    </HeaderWrap>
  );
}

export default Header;
