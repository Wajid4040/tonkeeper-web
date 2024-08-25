import React, { FC, useMemo } from 'react';
import { useAppContext } from '../../hooks/appContext';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { SettingsItem, SettingsList } from './SettingsList';
import settingIcon from '/settingicon.png'; // Import the setting icon

// Place the SettingsSocialList component code right after the imports
export const SettingsSocialList: FC = React.memo(() => {
    const sdk = useAppSdk();
    const { config } = useAppContext();
    const { t } = useTranslation();

    const items = useMemo(() => {
        const result = [] as SettingsItem[];
        return result.concat([
            {
                name: t('settings_support'),
                icon: <img src={settingIcon} alt="Icon" style={{ width: '12px', height: '12px',paddingRight:'36px'  }} />, // Use the setting icon
                action: () => config.directSupportUrl && sdk.openPage(config.directSupportUrl)
            }
        ]);
    }, [t, sdk, config.directSupportUrl]);

    return <SettingsList items={items} />;
});

// Other components, logic, or exports can follow below
