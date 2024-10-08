import { useAppSdk } from '../hooks/appSdk';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppKey } from '@tonkeeper/core/dist/Keys';
import { FiatCurrencies } from '@tonkeeper/core/dist/entries/fiat';

export const useUserFiat = () => {
    const sdk = useAppSdk();
    return useQuery<FiatCurrencies>(
        [AppKey.FIAT],
        async () => {
            return (
                (await sdk.storage.get<FiatCurrencies | undefined>(AppKey.FIAT)) ||
                FiatCurrencies.USD
            );
        },
        {
            keepPreviousData: true
        }
    );
};

export const useMutateUserFiat = () => {
    const sdk = useAppSdk();
    const client = useQueryClient();
    return useMutation<void, Error, FiatCurrencies>(async fiat => {
        await sdk.storage.set(AppKey.FIAT, fiat);
        await client.invalidateQueries([AppKey.FIAT]);
    });
};
