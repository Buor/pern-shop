import React from 'react'
import styled from "styled-components"
import { SContainer } from '../../styledComponents/baseStyledComponents';

const SHeader = styled.div`
    background-color: black;
`;

const Header: React.FC = () => {

    return (
        <SHeader>
            <SContainer maxWidth={1200} safePadding={15}>
                text
            </SContainer>
        </SHeader>
    )
}

export default Header