import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InnerBody } from '../../components/Body';
import { ListBlock, ListItem, ListItemPayload } from '../../components/List';
import { SubHeader } from '../../components/SubHeader';
import { Label1 } from '../../components/Text';
import { ChangePasswordNotification } from '../../components/create/ChangePassword';
import { Switch } from '../../components/fields/Switch';
import { KeyIcon, LockIcon } from '../../components/settings/SettingsIcons';
import { SettingsItem, SettingsList } from '../../components/settings/SettingsList';
import { useTranslation } from '../../hooks/translation';
import { AppRoute, SettingsRoute } from '../../libs/routes';
import { useIsActiveWalletKeystone } from '../../state/keystone';
import { useIsActiveWalletLedger } from '../../state/ledger';
import {
    useCanPromptTouchId,
    useLookScreen,
    useMutateLookScreen,
    useMutateTouchId,
    useTouchIdEnabled
} from '../../state/password';
import { useIsPasswordSet } from '../../state/wallet';
import { useIsFullWidthMode } from '../../hooks/useIsFullWidthMode';
import styled from 'styled-components';

const SettingsBox = styled.div`
    padding: 16px;
    box-shadow: 0 4px 8px #449981;
    border-radius: 40px;
    background-color: #fff;
    margin-bottom: 24px;
`;

const WhiteInnerBody = styled(InnerBody)`
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
`;

const WhiteListItem = styled(ListItem)`
    background-color: #fff;
    border-radius: 8px;
    position: relative;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #e0e0e0;  /* Divider line color */
    }
`;

const LabelWithPadding = styled(Label1)`
  /* Adjust this value to move the text further */
`;

const LockSwitch = () => {
    const { t } = useTranslation();

    const isPasswordSet = useIsPasswordSet();

    const { data } = useLookScreen();
    const { mutate: toggleLock } = useMutateLookScreen();

    if (isPasswordSet) {
        return (
            <ListBlock>
                <WhiteListItem hover={false}>
                    <ListItemPayload>
                        <LabelWithPadding>{t('Lock_screen')}</LabelWithPadding>
                        <Switch checked={!!data} onChange={toggleLock} />
                    </ListItemPayload>
                </WhiteListItem>
            </ListBlock>
        );
    } else {
        return <></>;
    }
};

const TouchIdSwitch = () => {
    const { t } = useTranslation();
    const { data: canPrompt } = useCanPromptTouchId();

    const { data: touchIdEnabled } = useTouchIdEnabled();
    const { mutate } = useMutateTouchId();

    if (!canPrompt) {
        return null;
    }

    return (
        <ListBlock>
            <WhiteListItem hover={false}>
                <ListItemPayload>
                    <LabelWithPadding>{t('biometry_ios_fingerprint')}</LabelWithPadding>
                    <Switch checked={!!touchIdEnabled} onChange={mutate} />
                </ListItemPayload>
            </WhiteListItem>
        </ListBlock>
    );
};

const ChangePassword = () => {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);

    const isPasswordSet = useIsPasswordSet();
    const items = useMemo(() => {
        const i: SettingsItem[] = [
            {
                name: t('Change_password'),
                icon: <LockIcon />,
                action: () => setOpen(true)
            }
        ];
        return i;
    }, [t]);

    if (isPasswordSet) {
        return (
            <>
                <SettingsList items={items} />
                <ChangePasswordNotification isOpen={isOpen} handleClose={() => setOpen(false)} />
            </>
        );
    } else {
        return <></>;
    }
};

const ShowPhrases = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isLedger = useIsActiveWalletLedger();
    const isKeystone = useIsActiveWalletKeystone();
    const isFullWidthMode = useIsFullWidthMode();

    const items = useMemo(() => {
        const i: SettingsItem[] = [
            {
                name: t('settings_backup_seed'),
                icon: <KeyIcon />,
                action: () => navigate(AppRoute.settings + SettingsRoute.recovery)
            }
        ];
        return i;
    }, [navigate, t]);

    if (isLedger || isKeystone || isFullWidthMode) {
        return <></>;
    }

    return <SettingsList items={items} />;
};

export const SecuritySettings = () => {
    const { t } = useTranslation();
    return (
        <>
            <SubHeader title={t('settings_security')} />
            <WhiteInnerBody>
                <SettingsBox>
                    <LockSwitch />
                    <TouchIdSwitch />
                    <ChangePassword />
                    <ShowPhrases />
                </SettingsBox>
            </WhiteInnerBody>
        </>
    );
};
