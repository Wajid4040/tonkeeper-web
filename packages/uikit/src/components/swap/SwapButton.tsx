import { FC } from 'react';
import styled from 'styled-components';
import { Button as OriginalButton } from '../fields/Button';
import {
    useIsSwapFormNotCompleted,
    useMaxSwapValue,
    useSelectedSwap,
    useSwapFromAmount,
    useSwapFromAsset,
    useSwapPriceImpact
} from '../../state/swap/useSwapForm';
import { useCalculatedSwap } from '../../state/swap/useCalculatedSwap';
import { useIsActiveWalletLedger } from '../../state/ledger';
import { useSwapOptions } from '../../state/swap/useSwapOptions';
import { useTranslation } from '../../hooks/translation';
import { shiftedDecimals } from '@tonkeeper/core/dist/utils/balance';

interface SwapButtonProps {
    onClick: () => void;
    isEncodingProcess: boolean;
}

const SquareButton = styled(OriginalButton)`
    width: 100%;
    max-width: 400px;
    height: 50px;
    background: linear-gradient(135deg, #ddf2e8 0%, #c4ebd6 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color:black;
    text-align: center;
`;

export const SwapButton: FC<SwapButtonProps> = ({
    onClick,
    isEncodingProcess
}) => {
    const { t } = useTranslation();
    const [swapAmount] = useSwapFromAmount();
    const [fromAsset] = useSwapFromAsset();
    const { data: max } = useMaxSwapValue();
    const { isFetching, data: calculatedSwaps } = useCalculatedSwap();
    const [selectedSwap] = useSelectedSwap();

    const priceImpact = useSwapPriceImpact();
    const { data: swapOptions } = useSwapOptions();

    const isNotCompleted = useIsSwapFormNotCompleted();
    const activeIsLedger = useIsActiveWalletLedger();

    if (activeIsLedger) {
        return (
            <SquareButton size="medium" secondary disabled>
                {t('swap_ledger_not_supported')}
            </SquareButton>
        );
    }

    if (isNotCompleted) {
        return (
            <SquareButton size="medium" secondary disabled>
                {t('swap_enter_amount')}
            </SquareButton>
        );
    }

    if (!isFetching && calculatedSwaps?.every(s => !s.trade)) {
        return (
            <SquareButton size="medium" disabled>
                {t('swap_trade_is_not_available')}
            </SquareButton>
        );
    }

    if ((isFetching && !selectedSwap?.trade) || !max || priceImpact === undefined || !swapOptions) {
        return (
            <SquareButton size="medium" secondary loading={true}>
                {t('continue')}
            </SquareButton>
        );
    }

    if (!selectedSwap || !selectedSwap.trade) {
        return (
            <SquareButton size="medium" secondary disabled>
                {t('swap_trade_is_not_available')}
            </SquareButton>
        );
    }

    const isNotEnoughFunds = swapAmount?.gt(shiftedDecimals(max!, fromAsset.decimals));

    if (isNotEnoughFunds) {
        return (
            <SquareButton size="medium" secondary disabled>
                {t('swap_not_enough_funds')}
            </SquareButton>
        );
    }

    const priceImpactTooHigh = priceImpact?.gt(swapOptions.maxPriceImpact);
    if (priceImpactTooHigh) {
        return (
            <SquareButton size="medium" secondary disabled>
                {t('swap_price_impact_too_high')}
            </SquareButton>
        );
    }

    return (
        <SquareButton size="medium" primary onClick={onClick} loading={isEncodingProcess}>
            {t('continue')}
        </SquareButton>
    );
};
