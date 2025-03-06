import React from 'react'
import styled from 'styled-components';

const StyledContainer = styled.div `
    padding: 4.5rem;
`

const Container = ({ children }: any) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container
