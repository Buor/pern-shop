import React from 'react'
import styled from "styled-components"
import { Container } from '../../styledComponents/baseStyledComponents';

const SHeader = styled.div`
    background-color: black;
`;

const Header: React.FC = () => {

    return (
        <SHeader>
            <Container maxWidth={1200} safePadding={15}>
                text
            </Container>
        </SHeader>
    )
}

export default Header