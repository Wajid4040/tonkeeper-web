import { BLOCKCHAIN_NAME } from '@tonkeeper/core/dist/entries/crypto';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { useAppContext } from '../../../hooks/appContext';
import { useAppSdk } from '../../../hooks/appSdk';
import { formatFiatCurrency } from '../../../hooks/balance';
import { useTranslation } from '../../../hooks/translation';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { usePreFetchRates } from '../../../state/rates';
import { useTonendpointBuyMethods } from '../../../state/tonendpoint';
import { fallbackRenderOver } from '../../Error';
import { ArrowDownIcon, ArrowUpIcon, PlusIconSmall } from '../../Icon';
import { Body2Class, Num2 } from '../../Text';
import { Button } from '../../fields/Button';
import { IconButton } from '../../fields/IconButton';
import { Link } from 'react-router-dom';
import { AppProRoute, AppRoute, SettingsRoute } from '../../../libs/routes';
import { BuyNotification } from '../../home/BuyAction';
import { Skeleton } from '../../shared/Skeleton';
import { useWalletTotalBalance } from '../../../state/asset';
import { hexToRGBA } from '../../../libs/css';
import { useActiveTonNetwork } from '../../../state/wallet';
import { Network } from '@tonkeeper/core/dist/entries/network';

const DesktopHeaderStyled = styled.div`
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${p => p.theme.backgroundContentAttention};
    background: ${p => p.theme.backgroundContent};

    * {
        user-select: none;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 1rem;

    > * {
        text-decoration: none;
    }
`;

const DesktopRightPart = styled.div`
    display: flex;
`;

const ButtonStyled = styled(Button)`
    display: flex;
    gap: 6px;

    > svg {
        color: ${p => p.theme.buttonTertiaryForeground};
    }
`;

const BalanceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & > ${IconButton} {
        padding: 4px;
        background-color: ${p => p.theme.buttonTertiaryBackground};

        transition: background-color 0.15s ease-in-out;

        &:hover {
            background-color: ${p => p.theme.buttonTertiaryBackgroundHighlighted};
        }

        &:disabled {
            background-color: ${p => p.theme.buttonTertiaryBackgroundDisabled};
            animation-name: spin;
            cursor: default;
        }

        animation-name: unset;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const LinkStyled = styled(Link)`
    text-decoration: unset;
`;

const TestnetBadge = styled(Link)`
    background: ${p => hexToRGBA(p.theme.accentRed, 0.16)};
    color: ${p => p.theme.accentRed};
    padding: 4px 8px;
    border-radius: ${p => p.theme.corner2xSmall};
    border: none;
    text-transform: uppercase;
    margin-left: 10px;
    margin-right: auto;
    text-decoration: none;

    transition: background 0.15s ease-in-out;

    &:hover {
        background: ${p => hexToRGBA(p.theme.accentRed, 0.36)};
    }

    ${Body2Class};
`;

const DesktopHeaderPayload = () => {
    usePreFetchRates();
    const { fiat } = useAppContext();
    const { data: balance, isLoading } = useWalletTotalBalance(fiat);
    const sdk = useAppSdk();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { data: buy } = useTonendpointBuyMethods();
    const { t } = useTranslation();
    const network = useActiveTonNetwork();

    return (
        <DesktopHeaderStyled>
            {isLoading ? (
                <Skeleton width="100px" height="36px" />
            ) : (
                <BalanceContainer>
                    <Num2>{formatFiatCurrency(fiat, balance || 0)}</Num2>
                </BalanceContainer>
            )}
            {network === Network.TESTNET && (
                <TestnetBadge to={AppRoute.settings + SettingsRoute.dev}>Testnet</TestnetBadge>
            )}
            <DesktopRightPart>
                <ButtonsContainer>
                    <ButtonStyled
                        size="small"
                        onClick={() =>
                            sdk.uiEvents.emit('transfer', {
                                method: 'transfer',
                                id: Date.now(),
                                params: { asset: 'TON', chain: BLOCKCHAIN_NAME.TON }
                            })
                        }
                    >
                        <ArrowUpIcon />
                        {t('wallet_send')}
                    </ButtonStyled>
                    <LinkStyled to={AppProRoute.multiSend}>
                        <ButtonStyled size="small">
                            <ArrowUpIcon />
                            {t('wallet_multi_send')}
                        </ButtonStyled>
                    </LinkStyled>
                    <ButtonStyled
                        size="small"
                        onClick={() => {
                            sdk.uiEvents.emit('receive', {
                                method: 'receive',
                                params: {}
                            });
                        }}
                    >
                        <ArrowDownIcon />
                        {t('wallet_receive')}
                    </ButtonStyled>
                    <ButtonStyled size="small" onClick={onOpen}>
                        <PlusIconSmall />
                        {t('wallet_buy')}
                    </ButtonStyled>
                </ButtonsContainer>
            </DesktopRightPart>
            <BuyNotification buy={buy} open={isOpen} handleClose={onClose} />
        </DesktopHeaderStyled>
    );
};

export const DesktopHeader = () => {
    return (
        <ErrorBoundary fallbackRender={fallbackRenderOver('Failed to display desktop header')}>
            <DesktopHeaderPayload />
        </ErrorBoundary>
    );
};
