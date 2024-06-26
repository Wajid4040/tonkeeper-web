import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { TokenRate } from '../../state/rates';
import { Body2, Label1, Label4 } from '../Text';

export const ListItemPayload = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 0.5rem 0;
    box-sizing: border-box;
    gap: 1rem;
    width: 100%;
    margin-left: -1rem;
    background-color: #D2DDDE; /* Background color */
    border: 1px solid #1B5853; /* Border color and width */
    border-radius: 10px; /* Adjust the value as needed */
`;




export const TokenLogo = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 1rem;
    margin-left: 1rem;

    border-radius: ${props => props.theme.cornerFull};


    `;

const Description = styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    white-space: nowrap;
`;

const FirstLine = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 0fr;
    gap: 0.25rem;
    width: 100%;
`;

const CoinName = styled(Label1)`
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
    font-size: 0.875rem; // Adjust font size to make it smaller
    margin: 0;          // Optionally adjust margin
`;

const CoinLabel = styled(Label4)`
    display: inline-block;
    margin-left: 8px;
    padding: 2px 2px;
    border-radius: ${props => props.theme.corner3xSmall};
    background: ${props => props.theme.backgroundContentTint};
    color: ${props => props.theme.textSecondary};
`;

const SecondLine = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Secondary = styled(Body2)`
    color: ${props => props.theme.textSecondary};
`;

const Symbol = styled(Label1)`
    color: ${props => props.theme.textSecondary};
`;

const VerificationTag = styled.div`
    margin-top: 4px;
    padding: 2px 6px;
    font-size: 10px;
    background-color: #e0ffe0;
    color: #006400;
    border-radius: 4px;
    align-self: flex-start;
`;

export const TokenLayout: FC<{
    name: string;
    symbol?: string;
    balance: string;
    secondary: React.ReactNode;
    fiatAmount?: string;
    label?: string;
    rate: TokenRate | undefined;
}> = ({ name, symbol, balance, secondary, fiatAmount, label, rate }) => {
    return (
        <Description>
            <FirstLine>
                <CoinName>
                    {symbol ?? name}
                    {label ? <CoinLabel>{label}</CoinLabel> : null}
                </CoinName>
                <Symbol></Symbol>
                <Label1>{balance}</Label1>
            </FirstLine>
            <SecondLine>
                <Secondary>
                    {
                        <>
                            {secondary} <Delta data={rate} />
                        </>
                    }
                </Secondary>
                <Secondary>{fiatAmount}</Secondary>
            </SecondLine>
          
        </Description>
    );
};

const DeltaColor = styled.span<{ positive: boolean }>`
  margin-left: 0.5rem;
  opacity: 0.64;

  ${props =>
      props.positive
          ? css`
                color: ${props.theme.accentGreen};
            `
          : css`
                color: ${props.theme.accentRed};
            `}}
`;

const Delta: FC<{ data: TokenRate | undefined }> = ({ data }) => {
    if (!data || !data.diff24h || data.diff24h == '0') return null;
    const positive = data.diff24h.startsWith('+');
    return <DeltaColor positive={positive}>{data.diff24h}</DeltaColor>;
};
