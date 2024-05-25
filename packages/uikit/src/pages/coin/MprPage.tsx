import { useInfiniteQuery } from '@tanstack/react-query';
import { BLOCKCHAIN_NAME } from '@tonkeeper/core/dist/entries/crypto';

import { Account, AccountsApi } from '@tonkeeper/core/dist/tonApiV2';
import { formatDecimals } from '@tonkeeper/core/dist/utils/balance';
import React, { FC, useMemo, useRef } from 'react';
import { InnerBody } from '../../components/Body';
import { CoinSkeletonPage } from '../../components/Skeleton';
import { SubHeader } from '../../components/SubHeader';
import { ActivityList } from '../../components/activity/ActivityGroup';
import { HomeActions } from '../../components/home/TonActions';
import { CoinInfo } from '../../components/jettons/Info';
import { useAppContext, useWalletContext } from '../../hooks/appContext';
import { useFormatBalance } from '../../hooks/balance';
import { useTranslation } from '../../hooks/translation';
import { useFetchNext } from '../../hooks/useFetchNext';
import { QueryKey } from '../../libs/queryKey';
import { useFormatFiat, useRate } from '../../state/rates';
import { groupAndFilterTonActivityItems } from '../../state/ton/tonActivity';
import { useWalletJettonList } from '../../state/wallet';

const MprHeader: FC<{ balance: string }> = ({ balance }) => {
    const { t } = useTranslation();
    const formattedBalance = useFormatBalance(balance, 5); // Assuming MPR has 5 decimals
    const mprAddress = '0:2f00f9b934c03398c8e1d257625790e3cca220366e487bf1142e6999b5d0de0d';
    const { data: mprRate } = useRate(mprAddress);
    const { fiatAmount } = useFormatFiat(mprRate, balance);

    return (
        <CoinInfo
            amount={formattedBalance}
            symbol="MPR"
            price={fiatAmount}
            description={t('MPR_page_description')}
            image="https://cache.tonapi.io/imgproxy/8leKEnEkM2PMVPk-EI1ZdQnpoScV33EnQeEkisrGAw0/rs:fill:200:200:1/g:no/aHR0cHM6Ly9tZWdhcGF5ZXIuaW8vd3AtY29udGVudC91cGxvYWRzL01lZ2FwYXllci1sb2dvdGlja2VyLnBuZw.webp"
        />
    );
};

export const MprPage = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const { data: jettonBalances } = useWalletJettonList(); // Fetch jetton balances
    const { api, standalone } = useAppContext();
    const wallet = useWalletContext();

    const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isFetched } = useInfiniteQuery({
        queryKey: [wallet.active.rawAddress, QueryKey.activity, 'mpr'],
        queryFn: ({ pageParam = undefined }) =>
            new AccountsApi(api.tonApiV2).getAccountEvents({
                accountId: wallet.active.rawAddress,
                limit: 20,
                beforeLt: pageParam,
                subjectOnly: true
            }),
        getNextPageParam: lastPage => (lastPage.nextFrom > 0 ? lastPage.nextFrom : undefined)
    });

    useFetchNext(hasNextPage, isFetchingNextPage, fetchNextPage, standalone, ref);

    const activity = useMemo(() => {
        return data ? groupAndFilterTonActivityItems(data) : undefined;
    }, [data]);

    // Find the MPR token balance and rate
    const mprJetton = jettonBalances?.balances.find(jetton => jetton.jetton.symbol === 'MPR');
    const mprBalance = mprJetton ? formatDecimals(mprJetton.balance, mprJetton.jetton.decimals).toString() : '0';

    return (
        <>
            <SubHeader title={t('Megapayer')} />
            <InnerBody ref={ref}>
                <MprHeader balance={mprBalance} />
                <HomeActions chain={BLOCKCHAIN_NAME.TON} />
                <ActivityList
                    isFetched={isFetched}
                    isFetchingNextPage={isFetchingNextPage}
                    tonEvents={activity}
                />
            </InnerBody>
        </>
    );
};
