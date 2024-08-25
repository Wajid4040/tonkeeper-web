import { intlLocale } from '@tonkeeper/core/dist/entries/language';
import country from 'country-list-js';
import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { InnerBody } from '../../components/Body';
import { CheckIcon } from '../../components/Icon';
import { SubHeader } from '../../components/SubHeader';
import { CountryIcon } from '../../components/fields/RoundedButton';
import { Input } from '../../components/fields/Input';
import { SettingsItem, SettingsList } from '../../components/settings/SettingsList';
import { useTranslation } from '../../hooks/translation';
import { useAutoCountry, useCountrySetting, useMutateUserCountry } from '../../state/country';

const Block = styled.div`
    margin-bottom: 32px;
`;

const CountryBox = styled.div`
    padding: 16px;
    box-shadow: 0 4px 8px #449981;
    border-radius: 40px;
    background-color: #fff;
    margin-bottom: 24px;
`;

export const CountrySettings = () => {
    const { t, i18n } = useTranslation();

    const { data: selected } = useCountrySetting();
    const { data: detected } = useAutoCountry();
    const { mutate } = useMutateUserCountry();

    const autoItem = useMemo<SettingsItem[]>(() => {
        return [
            {
                name: t('auto'),
                preIcon: detected ? <CountryIcon country={detected} /> : undefined,
                icon: selected == null ? <CheckIcon /> : undefined,
                action: () => mutate(undefined)
            }
        ];
    }, [t, selected, detected, mutate]);

    const countries = useMemo<SettingsItem[]>(() => {
        return Object.entries(country.all).map(([key, value]) => {
            return {
                name:
                    new Intl.DisplayNames([intlLocale(i18n.language)], { type: 'region' }).of(
                        key
                    ) ?? (value as any).name,
                preIcon: <CountryIcon country={key} />,
                icon: selected == key ? <CheckIcon /> : undefined,
                action: () => mutate(key)
            };
        });
    }, [selected, mutate]);

    return (
        <>
            <SubHeader title={t('country')} />
            <InnerBody>
               
                <SettingsList items={autoItem} />
                <CountryBox>
                    <SettingsList items={countries} />
                </CountryBox>
            </InnerBody>
        </>
    );
};
