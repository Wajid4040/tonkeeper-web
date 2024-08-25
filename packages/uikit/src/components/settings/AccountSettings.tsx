import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/appContext';
import { useTranslation } from '../../hooks/translation';
import { SettingsRoute, relative, WalletSettingsRoute } from '../../libs/routes';
import { useJettonList } from '../../state/jetton';
import { DeleteAccountNotification } from './DeleteAccountNotification';
import { SettingsItem } from './SettingsList';
import { useActiveWallet, useAccountsState, useActiveAccount } from '../../state/wallet';
import { useWalletNftList } from '../../state/nft';
import settingIcon from '/settingicon.png';
import { ClearSettings } from './ClearSettings';
import { SettingsSocialList } from './SettingsSocialList';

const iconStyle = { width: '12px', height: '12px', marginLeft: 'auto', marginRight: '25px' };

const ThemeSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { fiat } = useAppContext();

    const secondaryItems = useMemo(() => {
        const items: SettingsItem[] = [];

        items.push({
            name: t('settings_primary_currency'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(SettingsRoute.fiat)),
        });

        items.push({
            name: t('country'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(SettingsRoute.country)),
        });

        return items;
    }, [t, navigate, fiat]);

    return (
        <div>
            {secondaryItems.map((item, index) => (
                <div
                    key={index}
                    className="settings-item"
                    onClick={() => item.action(item)}
                    style={{ backgroundColor: 'white' }}
                >
                    <span>{item.name}</span>
                    <div className="settings-item-icon">{item.icon}</div>
                </div>
            ))}
        </div>
    );
};

const SingleAccountSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const account = useActiveAccount();
    const wallet = account.activeTonWallet;
    const { data: jettons } = useJettonList();
    const { data: nft } = useWalletNftList();
    const { proFeatures } = useAppContext();

    const [deleteAccount, setDeleteAccount] = useState(false);

    const mainItems = useMemo<SettingsItem[]>(() => {
        const items: SettingsItem[] = [];

        if (account.type === 'mnemonic') {
            items.push({
                name: t('settings_recovery_phrase'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.recovery))
            });
        }

        if (account.type === 'mnemonic' || account.type === 'ton-only') {
            items.push({
                name: t('settings_wallet_version'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.version))
            });
        }

        if (account.type === 'ledger' && account.allAvailableDerivations.length > 1) {
            items.push({
                name: t('settings_ledger_indexes'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.ledgerIndexes))
            });
        }

        if (proFeatures) {
            items.unshift({
                name: t('tonkeeper_pro'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.pro))
            });
        }

        if (jettons?.balances.length) {
            items.push({
                name: t('settings_jettons_list'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.jettons))
            });
        }

        if (nft?.length) {
            items.push({
                name: t('settings_collectibles_list'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.nft))
            });
        }

        items.push({
            name: t('settings_security'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(SettingsRoute.security))
        });
        items.push({
            name: t('settings_connected_apps'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(WalletSettingsRoute.connectedApps))
        });

        return items;
    }, [t, navigate, account, jettons, nft]);

    return (
        <>
            <style>
                {`
                .settings-box {
                    padding: 30px;
                    border-radius: 40px;
                    box-shadow: 0 2px 4px #449981;
                    max-width: 100%;
                }

                .settings-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 0;
                    cursor: pointer;
                    font-weight: 600;
                    border-bottom: 1px solid #e0e0e0;
                    word-wrap: break-word;
                    margin-bottom: 18px; /* 18px space between each item */
                }
                .settings-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0; /* No extra space after the last item */
                }

                .settings-item-icon {
                    margin-left: auto;
                    margin-right: 25px;
                    display: flex;
                    align-items: center;
                }

                .white-background {
                    background-color: white;
                }

                .divider {
                    height: 1px;
                    background-color: #e0e0e0;
                }

                .spaced-divider {
                    margin: 15px 0;
                    height: 1px;
                    background-color: #e0e0e0;
                }

                @media (max-width: 768px) {
                    .settings-box {
                        padding: 15px;
                        border-radius: 20px;
                    }

                    .settings-item {
                        padding: 10px 0;
                        margin-bottom: 18px; /* 18px space between each item */
                    }

                    .settings-item-icon {
                        margin-right: 15px;
                    }
                }

                @media (max-width: 480px) {
                    .settings-box {
                        padding: 10px;
                        border-radius: 15px;
                    }

                    .settings-item {
                        padding: 10px 0;
                        margin-bottom: 18px; /* 18px space between each item */
                    }

                    .settings-item-icon {
                        margin-right: 10px;
                    }
                }
                `}
            </style>
            <div className="settings-box white-background">
                {mainItems.map((item, index) => (
                    <div
                        key={index}
                        className="settings-item"
                        onClick={() => item.action(item)}
                    >
                        <span>{item.name}</span>
                        <div className="settings-item-icon">{item.icon}</div>
                    </div>
                ))}

                <ThemeSettings />

                <div className="spaced-divider" />
                <SettingsSocialList />

                <div className="spaced-divider" />
                <ClearSettings />

                <div className="white-background">
                    <DeleteAccountNotification
                        account={deleteAccount ? account : undefined}
                        handleClose={() => setDeleteAccount(false)}
                    />
                </div>
            </div>
        </>
    );
};

const MultipleAccountSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const wallet = useActiveWallet();

    const { data: jettons } = useJettonList();
    const { data: nft } = useWalletNftList();
    const { proFeatures } = useAppContext();
    const account = useActiveAccount();

    const [deleteAccount, setDeleteAccount] = useState(false);

    const accountItems = useMemo<SettingsItem[]>(() => {
        const items: SettingsItem[] = [
            {
                name: t('Manage_wallets'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.account))
            }
        ];

        if (proFeatures) {
            items.push({
                name: t('tonkeeper_pro'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.pro))
            });
        }

        return items;
    }, [wallet, t]);

    const mainItems = useMemo<SettingsItem[]>(() => {
        const items: SettingsItem[] = [];

        if (account.type === 'mnemonic') {
            items.push({
                name: t('settings_recovery_phrase'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.recovery))
            });
        }

        if (account.type === 'mnemonic' || account.type === 'ton-only') {
            items.push({
                name: t('settings_wallet_version'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.version))
            });
        }

        if (account.type === 'ledger' && account.allAvailableDerivations.length > 1) {
            items.push({
                name: t('settings_ledger_indexes'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.ledgerIndexes))
            });
        }

        if (jettons?.balances.length) {
            items.push({
                name: t('settings_jettons_list'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.jettons))
            });
        }

        if (nft?.length) {
            items.push({
                name: t('settings_collectibles_list'),
                icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
                action: () => navigate(relative(SettingsRoute.nft))
            });
        }

        items.push({
            name: t('settings_security'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(SettingsRoute.security))
        });
        items.push({
            name: t('settings_connected_apps'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => navigate(relative(WalletSettingsRoute.connectedApps))
        });
        items.push({
            name: t('Delete_wallet_data'),
            icon: <img src={settingIcon} alt="Icon" style={iconStyle} />,
            action: () => setDeleteAccount(true)
        });
        return items;
    }, [t, navigate, wallet, jettons, nft]);

    return (
        <>
            <style>
                {`
                .settings-box {
                    padding: 15px;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .settings-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 0;
                    cursor: pointer;
                    font-weight: bold;
                    border-bottom: 1px solid #e0e0e0;
                    word-wrap: break-word;
                    margin-bottom: 18px; /* 18px space between each item */
                }

                .settings-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0; /* No extra space after the last item */
                }

                .settings-item-icon {
                    margin-left: auto;
                    margin-right: 25px;
                    display: flex;
                    align-items: center;
                }

                .white-background {
                    background-color: white;
                }

                .divider {
                    height: 1px;
                    background-color: #e0e0e0;
                    margin: 5px 0;
                }

                .spaced-divider {
                    margin: 15px 0;
                    height: 1px;
                    background-color: #e0e0e0;
                }

                @media (max-width: 768px) {
                    .settings-box {
                        padding: 10px;
                        border-radius: 10px;
                    }

                    .settings-item {
                        padding: 8px 0;
                        margin-bottom: 18px; /* 18px space between each item */
                    }

                    .settings-item-icon {
                        margin-right: 15px;
                    }
                }

                @media (max-width: 480px) {
                    .settings-box {
                        padding: 8px;
                        border-radius: 8px;
                    }

                    .settings-item {
                        padding: 5px 0;
                        margin-bottom: 18px; /* 18px space between each item */
                    }

                    .settings-item-icon {
                        margin-right: 10px;
                    }
                }
                `}
            </style>
            <div className="settings-box white-background">
                {accountItems.map((item, index) => (
                    <div
                        key={index}
                        className="settings-item"
                        onClick={() => item.action(item)}
                    >
                        <span>{item.name}</span>
                        <div className="settings-item-icon">{item.icon}</div>
                    </div>
                ))}

                <div />
                {mainItems.map((item, index) => (
                    <div
                        key={index}
                        className="settings-item"
                        onClick={() => item.action(item)}
                    >
                        <span>{item.name}</span>
                        <div className="settings-item-icon">{item.icon}</div>
                    </div>
                ))}

                <ThemeSettings />

                <div className="spaced-divider" />
                <SettingsSocialList />

                <div className="spaced-divider" />
                <ClearSettings />

                <div className="white-background">
                    <DeleteAccountNotification
                        account={deleteAccount ? account : undefined}
                        handleClose={() => setDeleteAccount(false)}
                    />
                </div>
            </div>
        </>
    );
};

export const AccountSettings = () => {
    const accounts = useAccountsState();

    if (accounts.length > 1) {
        return <MultipleAccountSettings />;
    } else {
        return <SingleAccountSettings />;
    }
};
