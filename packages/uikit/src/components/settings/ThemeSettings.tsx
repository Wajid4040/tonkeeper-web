import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/appContext';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { relative, SettingsRoute } from '../../libs/routes';
import { SettingsItem, SettingsList } from './SettingsList';
import settingIcon from '/settingicon.png'; // Import the setting icon

export const ThemeSettings = () => {
    const sdk = useAppSdk();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { fiat } = useAppContext();

    const secondaryItems = useMemo(() => {
        const items: SettingsItem[] = [];

        if (sdk.notifications) {
            items.push({
                name: t('settings_notifications'),
                icon: <img src={settingIcon} alt="Icon" style={{ width: '30px', height: '30px' }} />,
                action: () => navigate(relative(SettingsRoute.notification))
            });
        }
        items.push({
            name: t('settings_primary_currency'),
            icon: <img src={settingIcon} alt="Icon" style={{ width: '12px', height: '12px' }} />,
            action: () => navigate(relative(SettingsRoute.fiat))
        });

        items.push({
            name: t('country'),
            icon: <img src={settingIcon} alt="Icon" style={{ width: '12px', height: '12px' }} />,
            action: () => navigate(relative(SettingsRoute.country))
        });

        return items;
    }, [t, navigate, sdk.notifications, fiat]);

    return (
        <>
            <style>
                {`
                .theme-settings-box {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .theme-settings-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 0;
                    cursor: pointer;
                    border-bottom: 1px solid #e0e0e0;
                    background-color: white; /* Explicitly setting white background for each item */
                }

                .theme-settings-item:last-child {
                    border-bottom: none;
                }

                .theme-settings-item:hover {
                    background-color: #f0f0f0;
                }

                .theme-settings-item-icon {
                    margin-left: auto;
                }
                `}
            </style>
            <div className="theme-settings-box">
                {secondaryItems.map((item, index) => (
                    <div
                        key={index}
                        className="theme-settings-item"
                        onClick={() => item.action(item)}
                    >
                        <span>{item.name}</span>
                        <div className="theme-settings-item-icon">{item.icon}</div>
                    </div>
                ))}
            </div>
        </>
    );
};
