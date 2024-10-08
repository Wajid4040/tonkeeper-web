import React, { FC, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Body3, Label2 } from '../Text';
import { RadioFlatInput } from '../shared/RadioFlatInput';
import { Notification } from '../Notification';
import { Button } from '../fields/Button';
import { useMutateSwapOptions, useSwapOptions } from '../../state/swap/useSwapOptions';
import { SpinnerIcon } from '../Icon';
import { useTranslation } from '../../hooks/translation';

export const SwapSettingsNotification: FC<{
    isOpen: boolean;
    onClose: (confirmed?: boolean) => void;
}> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    return (
        <>
            <Notification isOpen={isOpen} handleClose={onClose} title={t('swap_settings')}>
                {() => <SwapSettingsNotificationContent onClose={onClose} />}
            </Notification>
        </>
    );
};

const SlippageToleranceTextWrapper = styled.div`
    padding-bottom: 10px;

    > * {
        display: block;
        cursor: default;
    }

    > ${Body3} {
        color: ${p => p.theme.textSecondary};
    }
`;

const SlippageOptionsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
`;

const RadioFlatInputStyled = styled(RadioFlatInput)`
    height: 36px;
    flex: 1;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    > * {
        flex: 1;
    }
`;

const SquareGradientButton = styled(Button)`
    width: 50px; /* Make the button square */
    height: 50px;
    background: linear-gradient(135deg, #ddf2e8 0%, #c4ebd6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color:black;
    border-radius: 10px; /* Optional: Round the corners slightly */
    &:hover {
        background: linear-gradient(135deg, #c4ebd6 0%, #a2d4b6 100%);
    }
`;

const SquareCancelButton = styled(Button)`
    width: 50px; /* Make the button square */
    height: 50px;
    background: linear-gradient(135deg, #ed442c 0%, #f8aa68 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    border-radius: 10px; /* Optional: Round the corners slightly */
    &:hover {
        background: linear-gradient(135deg, #f8aa68 0%, #ed442c 100%);
    }
`;

const slippagePercentValues = [0.5, 1, 3, 5];
const defaultPercent = slippagePercentValues[1];

const LoadingContainer = styled.div`
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SwapSettingsNotificationContent: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const { data: swapOptions } = useSwapOptions();
    const { mutate } = useMutateSwapOptions();
    const [checkedRadioValue, setCheckedRadioValue] = useState<
        (typeof slippagePercentValues)[number] | undefined
    >();

    useLayoutEffect(() => {
        if (swapOptions?.slippagePercent) {
            if (slippagePercentValues.includes(swapOptions?.slippagePercent)) {
                setCheckedRadioValue(swapOptions?.slippagePercent);
            } else {
                setCheckedRadioValue(defaultPercent);
                mutate({ slippagePercent: defaultPercent });
            }
        }
    }, [swapOptions?.slippagePercent]);

    if (!swapOptions) {
        return (
            <LoadingContainer>
                <SpinnerIcon />
            </LoadingContainer>
        );
    }

    const onSave = () => {
        mutate({ slippagePercent: checkedRadioValue });
        onClose?.();
    };

    return (
        <>
            <SlippageToleranceTextWrapper>
                <Label2>{t('swap_slippage')}</Label2>
                <Body3>{t('swap_slippage_description')}</Body3>
            </SlippageToleranceTextWrapper>
            <SlippageOptionsContainer>
                {slippagePercentValues.map(value => (
                    <RadioFlatInputStyled
                        key={value}
                        name="slippage-percent"
                        value={value}
                        checked={checkedRadioValue === value}
                        onChange={() => setCheckedRadioValue(value)}
                    >
                        {value}%
                    </RadioFlatInputStyled>
                ))}
            </SlippageOptionsContainer>
            <ButtonsContainer>
                <SquareCancelButton secondary onClick={onClose}>
                    {t('cancel')}
                </SquareCancelButton>
                <SquareGradientButton
                    primary
                    disabled={checkedRadioValue === swapOptions.slippagePercent}
                    onClick={onSave}
                >
                    {t('save')}
                </SquareGradientButton>
            </ButtonsContainer>
        </>
    );
};
