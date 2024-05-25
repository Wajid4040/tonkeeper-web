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

// Use the public URL of your hosted image file
const customImageURL = 'https://cache.tonapi.io/imgproxy/8leKEnEkM2PMVPk-EI1ZdQnpoScV33EnQeEkisrGAw0/rs:fill:200:200:1/g:no/aHR0cHM6Ly9tZWdhcGF5ZXIuaW8vd3AtY29udGVudC91cGxvYWRzL01lZ2FwYXllci1sb2dvdGlja2VyLnBuZw.webp';

export const Loading = React.forwardRef<HTMLDivElement>(({}, ref) => {
    return (
        <Block ref={ref}>
            <img src={customImageURL} alt="Loading" />
        </Block>
    );
});
