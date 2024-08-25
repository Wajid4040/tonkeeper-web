import React, { useMemo, useState } from 'react';
import { useTranslation } from '../../hooks/translation';
import { DeleteAllNotification } from './DeleteAccountNotification';
import { SettingsList } from './SettingsList';
import { useAccountsState } from '../../state/wallet';
import settingIcon from '/settingicon.png';
// Import the setting icon

export const ClearSettings = () => {
    const { t } = useTranslation();

    const wallets = useAccountsState();
    const [open, setOpen] = useState(false);
    const deleteItems = useMemo(() => {
        return [
            {
                name:
                    wallets.length > 1
                        ? t('Delete_all_accounts_and_logout')
                        : t('settings_delete_account'),
                icon: <img src={settingIcon} alt="Icon" style={{ width: '12px', height: '12px',paddingRight:'36px'}} />, // Use the setting icon
                action: () => setOpen(true)
            }
        ];
    }, [t, wallets.length]);

    return (
        <>
            <SettingsList items={deleteItems} />
            <DeleteAllNotification open={open} handleClose={() => setOpen(false)} />
        </>
    );
};
