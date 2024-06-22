import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.backgroundPage};

    color: ${props => props.theme.accentBlue};
`;

const Logo = styled.img`
    width: 180px; // Increased size
    height: 180px;
    margin-bottom: 70px; // Added margin bottom
`;
// Use the public URL of your hosted image file
const customImageURL = 'https://i.ibb.co/XJC4snV/IMG-7537.png';

export const Loading = React.forwardRef<HTMLDivElement>(({}, ref) => {
    return (
        <Block ref={ref}>
            <Logo src={customImageURL} alt="Loading" />
        </Block>
    );
});
