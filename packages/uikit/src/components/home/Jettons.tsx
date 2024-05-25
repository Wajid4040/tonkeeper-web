import React, { FC, forwardRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from '@ton/core';
import { CryptoCurrency } from '@tonkeeper/core/dist/entries/crypto';
import { Account, JettonBalance, JettonsBalances, JettonVerificationType, AccountAddress } from '@tonkeeper/core/dist/tonApiV2';
import { TronBalances } from '@tonkeeper/core/dist/tronApi';
import { formatDecimals } from '@tonkeeper/core/dist/utils/balance';
import { useFormatBalance } from '../../hooks/balance';
import { useTranslation } from '../../hooks/translation';
import { AppRoute } from '../../libs/routes';
import { useFormatFiat, useRate } from '../../state/rates';
import { ListBlock, ListItem } from '../../components/List';  // Ensure the correct path to List components
import { ListItemPayload, TokenLayout, TokenLogo } from './TokenLayout';  // Correct path to TokenLayout components
import { useWalletJettonList, useWalletAccountInfo } from '../../state/wallet';

export interface TonAssetData {
    info: Account;
    jettons: JettonsBalances;
}

export interface AssetData {
    ton: TonAssetData;
    tron: TronBalances;
}

export interface AssetProps {
    assets: AssetData;
}

// Function to create the custom token with the user's wallet address and balance
const createCustomToken = (walletAddress: AccountAddress, balance: string): JettonBalance => ({
    jetton: {
        address: '0:2f00f9b934c03398c8e1d257625790e3cca220366e487bf1142e6999b5d0de0d',
        name: 'Megapayer',
        symbol: 'MPR',
        decimals: 5,
        image: 'https://cache.tonapi.io/imgproxy/8leKEnEkM2PMVPk-EI1ZdQnpoScV33EnQeEkisrGAw0/rs:fill:200:200:1/g:no/aHR0cHM6Ly9tZWdhcGF5ZXIuaW8vd3AtY29udGVudC91cGxvYWRzL01lZ2FwYXllci1sb2dvdGlja2VyLnBuZw.webp',
        verification: JettonVerificationType.Whitelist, // Use the correct case
    },
    balance: balance,
    walletAddress: walletAddress // Use the provided wallet address
});

export const TonAsset = forwardRef<
    HTMLDivElement,
    {
        info: Account;
        className?: string;
    }
>(({ info, className }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const amount = useMemo(() => formatDecimals(info.balance), [info.balance]);
    const balance = useFormatBalance(amount);

    const { data } = useRate(CryptoCurrency.TON);
    const { fiatPrice, fiatAmount } = useFormatFiat(data, amount);

    return (
        <ListItem onClick={() => navigate(AppRoute.coins + '/ton')} className={className} ref={ref}>
            <ListItemPayload>
                <TokenLogo src="https://wallet.tonkeeper.com/img/toncoin.svg" />
                <TokenLayout
                    name={t('Toncoin')}
                    symbol={CryptoCurrency.TON}
                    balance={balance}
                    secondary={fiatPrice}
                    fiatAmount={fiatAmount}
                    rate={data}
                />
            </ListItemPayload>
        </ListItem>
    );
});

export const JettonAsset = forwardRef<
    HTMLDivElement,
    {
        jetton: JettonBalance;
        className?: string;
    }
>(({ jetton, className }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [amount, address] = useMemo(
        () => [
            formatDecimals(jetton.balance, jetton.jetton.decimals),
            Address.parse(jetton.jetton.address).toString()
        ],
        [jetton]
    );
    const balance = useFormatBalance(amount, jetton.jetton.decimals);

    const { data } = useRate(address);
    const { fiatPrice, fiatAmount } = useFormatFiat(data, amount);

    const handleClick = () => {
        if (jetton.jetton.symbol === 'MPR') {
            navigate(AppRoute.coins + '/mpr');
        } else {
            navigate(AppRoute.coins + `/${encodeURIComponent(jetton.jetton.address)}`);
        }
    };

    return (
        <ListItem onClick={handleClick} className={className} ref={ref}>
            <ListItemPayload>
                <TokenLogo src={jetton.jetton.image} />
                    <TokenLayout
                        name={jetton.jetton.name ?? t('Unknown_COIN')}
                        symbol={jetton.jetton.symbol}
                        balance={balance}
                        secondary={fiatPrice}
                        fiatAmount={fiatAmount}
                        rate={data}
                    />
                    
               
            </ListItemPayload>
        </ListItem>
    );
});

export const JettonList: FC<AssetProps> = ({
    assets: {
        ton: { info, jettons },
        tron: _tron
    }
}) => {
    const { t } = useTranslation();
    const { data: jettonBalances } = useWalletJettonList(); // Fetch jetton balances

    const customToken = useMemo(() => {
        if (jettonBalances) {
            return createCustomToken(
                {
                    address: info.address,
                    isScam: false,
                    isWallet: true
                },
                jettonBalances.balances.find(balance => balance.jetton.symbol === 'MPR')?.balance ?? '0'
            );
        }
        return createCustomToken(
            {
                address: info.address,
                isScam: false,
                isWallet: true
            },
            '0'
        );
    }, [jettonBalances, info.address]);

    return (
        <>
            <ListBlock noUserSelect>
                <TonAsset info={info} />
                {/* TODO: ENABLE TRON */}
                {/* <TronAssets tokens={tron} /> */}
            </ListBlock>
            <ListBlock noUserSelect>
                {/* Add the custom token to the list */}
                <JettonAsset key={customToken.jetton.address} jetton={customToken} />
                {jettons.balances.map(jetton => (
                    <JettonAsset key={jetton.jetton.address} jetton={jetton} />
                ))}
            </ListBlock>
        </>
    );
};
