import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/appContext';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { SettingsRoute, relative } from '../../libs/routes';
import { ContactSupportIcon, LegalDocumentsIcon, TelegramIcon } from './SettingsIcons';
import { SettingsItem, SettingsList } from './SettingsList';

export const SettingsSocialList: FC = React.memo(() => {
    const navigate = useNavigate();
    const sdk = useAppSdk();
    const { config } = useAppContext();

    const { t } = useTranslation();
    const items = useMemo(() => {
        const result = [] as SettingsItem[];
        return result.concat([
            {
                name: t('settings_support'),
                icon: <TelegramIcon />,
                action: () => config.directSupportUrl && sdk.openPage(config.directSupportUrl)
            },
            
           
        ]);
    }, [t, navigate, sdk.openPage]);

    return <SettingsList items={items} />;
});
