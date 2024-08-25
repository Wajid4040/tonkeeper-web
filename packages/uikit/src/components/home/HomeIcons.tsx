import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
    width: 58px;  /* Width and height are equal to make a perfect circle */
    height: 45px;  /* Increased height to match width */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;  /* Rounded corners for circular shape */
`;

const BuyIconWrapper = styled(IconWrapper)`
    background: linear-gradient(90deg, #175085, #2384ce);  /* Gradient background for BuyIcon */
    box-shadow: 0 4px 6px rgba(23, 80, 133, 0.4), 0 1px 3px rgba(23, 80, 133, 0.3);  /* Shadow for BuyIcon */
`;

const SellIconWrapper = styled(IconWrapper)`
    background: linear-gradient(90deg, #e02b21, #ed6a4c);  /* Gradient background for SellIcon */
    box-shadow: 0 4px 6px rgba(224, 43, 33, 0.4), 0 1px 3px rgba(224, 43, 33, 0.3);  /* Shadow for SellIcon */
`;

const SendIconWrapper = styled(IconWrapper)`
    background: linear-gradient(90deg, #e02b21, #ed6a4c);  /* Gradient background for SendIcon */
    box-shadow: 0 4px 6px rgba(224, 43, 33, 0.4), 0 1px 3px rgba(224, 43, 33, 0.3);  /* Shadow for SendIcon */
`;

const ReceiveIconWrapper = styled(IconWrapper)`
    background: linear-gradient(90deg, #398674, #66d1a9);  /* Gradient background for ReceiveIcon */
    box-shadow: 0 4px 6px rgba(57, 134, 116, 0.4), 0 1px 3px rgba(57, 134, 116, 0.3);  /* Shadow for ReceiveIcon */
`;

export const BuyIcon = () => {
    return (
        <BuyIconWrapper>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 28 28"
                fill="none"
            >
                <path
                    d="M14 21.5V14M14 14V6.5M14 14H21.5M14 14H6.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </BuyIconWrapper>
    );
};

export const SellIcon = () => {
    return (
        <SellIconWrapper>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 28 28"
                fill="none"
            >
                <path
                    d="M6.5 14H21.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </SellIconWrapper>
    );
};

export const SendIcon = () => {
    return (
        <SendIconWrapper>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 28 28"
                fill="none"
            >
                <path
                    d="M14 6.5V21.5M14 6.5L7.5 13M14 6.5L20.5 13"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </SendIconWrapper>
    );
};

export const ReceiveIcon = () => {
    return (
        <ReceiveIconWrapper>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 28 28"
                fill="none"
            >
                <path
                    d="M14 21.5V6.5M14 21.5L7.5 15M14 21.5L20.5 15"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </ReceiveIconWrapper>
    );
};
