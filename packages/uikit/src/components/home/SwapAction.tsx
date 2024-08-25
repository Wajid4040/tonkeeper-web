import React, { FC } from 'react';
import { Action } from './Actions';
import { SwapIcon } from '../Icon';
import { useSwapMobileNotification } from '../../state/swap/useSwapMobileNotification';
import { TonAsset } from '@tonkeeper/core/dist/entries/crypto/asset/ton-asset';
import { useSwapFromAsset } from '../../state/swap/useSwapForm';
import styled from 'styled-components';

// Styled component for the background with gradient color themed box shadow
const SwapIconBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%);
    border-radius: 50%;
    height: 45px;
    width: 60px;
    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.5), 0px 4px 20px rgba(255, 140, 0, 0.4); /* Gradient-themed box shadow */
`;

const SwapIconStyled = styled(SwapIcon)`
    height: 24px;
    width: 24px;
    color: #FFFFFF;
`;

export const SwapAction: FC<{ fromAsset?: TonAsset }> = ({ fromAsset }) => {
    const [_, setIsOpen] = useSwapMobileNotification();
    const [__, setFromAsset] = useSwapFromAsset();

    const onAction = () => {
        if (fromAsset) {
            setFromAsset(fromAsset);
        }

        setIsOpen(true);
    };

    return (
        <Action 
            icon={
                <SwapIconBackground>
                    <SwapIconStyled />
                </SwapIconBackground>
            } 
            title={'swap_title'} 
            action={onAction} 
        />
    );
};
