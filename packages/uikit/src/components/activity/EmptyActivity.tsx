import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { useTonendpointBuyMethods } from '../../state/tonendpoint';
import { Body2, Label2 } from '../Text';
import { BuyNotification } from '../home/BuyAction';
import { Button } from '../fields/Button';
import { ArrowDownIcon, PlusIcon } from '../Icon';

const EmptyBody = styled.div`
    margin-top: -64px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const BodyText = styled(Body2)`
    color: ${props => props.theme.textSecondary};
    margin-bottom: 1.5rem;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
`;

const ButtonStyled = styled(Button)`
    display: flex;
    gap: 6px;
    width: 140px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    white-space: nowrap;
    padding: 0 12px;

    > svg {
        color: ${p => p.theme.buttonTertiaryForeground};
    }
`;

const BuyButton = styled(ButtonStyled)`
background: linear-gradient(90deg, #6ddcb2, #388573); /* Buy button gradient */
`;

const ReceiveButton = styled(ButtonStyled)`
    background: linear-gradient(45deg, #f05a39, #f9ad6a); /* Receive button gradient */
`;

const EmptyActivity = () => {
    const { t } = useTranslation();
    const sdk = useAppSdk();

    const [openBuy, setOpenBuy] = useState(false);

    const { data: buy } = useTonendpointBuyMethods();

    return (
        <EmptyBody>
            <Label2>{t('activity_empty_transaction_title')}</Label2>
            <BodyText>{t('activity_empty_transaction_caption')}</BodyText>
            <ButtonRow>
                <BuyButton size="small" onClick={() => setOpenBuy(true)}>
                    <PlusIcon />
                    {t('exchange_title')}
                </BuyButton>
                <ReceiveButton
                    size="small"
                    onClick={() => sdk.uiEvents.emit('receive', { method: 'receive', params: {} })}
                >
                    <ArrowDownIcon />
                    {t('wallet_receive')}
                </ReceiveButton>
            </ButtonRow>
            <BuyNotification buy={buy} open={openBuy} handleClose={() => setOpenBuy(false)} />
        </EmptyBody>
    );
};

export default EmptyActivity;
