import styled from 'styled-components';

const StyledContainer = styled.div `
    padding: 0 4.5rem 0.5rem;
`

const Container = ({ children }: any) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container
