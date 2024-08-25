import React, { FC } from 'react';
import { AccountSettings } from '../../components/settings/AccountSettings';
import { SettingsNetwork } from '../../components/settings/SettingsNetwork';

// Define the Settings component
export const Settings: FC = () => {
    return (
        <div>
            <AccountSettings />
            <SettingsNetwork />
        </div>
    );
};
