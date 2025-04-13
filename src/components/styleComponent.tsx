import styled from 'styled-components';

const StyledContainer = styled.div`
@media (min-width: 320px){
    padding: 0 0.5rem 0.1rem;
    margin-top: 16rem
    }

@media (min-width: 768px){
    padding: 0 1.5rem 0.5rem;
    margin-top: 0rem;
}
@media (min-width: 1024px){
    
}
`

const Container = ({ children }: any) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container
