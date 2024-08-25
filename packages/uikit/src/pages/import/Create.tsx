import { mnemonicNew } from '@ton/crypto';
import { useEffect, useState } from 'react';
import { IconPage } from '../../components/Layout';
import { UpdateWalletName } from '../../components/create/WalletName';
import { Check, Worlds } from '../../components/create/Words';
import { Button } from '../../components/fields/Button';
import {
    CheckLottieIcon,
    GearLottieIcon,
    WriteLottieIcon
} from '../../components/lottie/LottieIcons';
import { useAppContext } from '../../hooks/appContext';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { FinalView } from './Password';
import { Subscribe } from './Subscribe';
import { Account } from '@tonkeeper/core/dist/entries/account';
import { useCreateAccountMnemonic, useMutateRenameAccount } from '../../state/wallet';
import styled, { createGlobalStyle, css } from 'styled-components';

const GradientButton = styled(Button)`
    background: linear-gradient(90deg, #6ddcb2, #388573);
    border: none;
    color: white;
    box-shadow: 0px 8px 20px #c5ffdb;
    &:hover {
        background: linear-gradient(90deg, #388573, #6ddcb2);
    }
`;

const GlobalStyleCss = css`
    body {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${props => props.theme.backgroundContent};
        color: ${props => props.theme.textPrimary};
        overflow-y: scroll;
    }

    :root {
        --app-height: 100vh;
        --app-width: 100vw;
    }

    html.is-locked {
        height: calc(var(--app-height) - 1px);
    }

    html.is-locked,
    html.is-locked body,
    html.is-locked #root {
        overflow: hidden;
        box-sizing: border-box;
    }

    html.hidden,
    html.hidden body,
    html.hidden #root {
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
    }

    html.no-user-select {
        * {
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
    }

    .disable-hover {
        pointer-events: none;
    }

    input::-webkit-strong-password-auto-fill-button {
        display: none !important;
    }

    input::-webkit-contacts-auto-fill-button,
    input::-webkit-credentials-auto-fill-button {
        visibility: hidden;
        position: absolute;
        right: 0;
    }

    .win32 #body::-webkit-scrollbar,
    .linux #body::-webkit-scrollbar,
    .win32 .full-size-wrapper::-webkit-scrollbar,
    .linux .full-size-wrapper::-webkit-scrollbar,
    .win32 .notification-overlay::-webkit-scrollbar,
    .linux .notification-overlay::-webkit-scrollbar,
    .win32 .dialog-content::-webkit-scrollbar,
    .linux .dialog-content::-webkit-scrollbar,
    .win32 .hide-scrollbar::-webkit-scrollbar,
    .linux .hide-scrollbar::-webkit-scrollbar {
        width: 0;
    }

    // Targeting the logout button specifically
    .logout-button,
    button[aria-label="logout"] {
        color: white !important;
    }
`;

const GlobalStyle = createGlobalStyle`
  ${GlobalStyleCss}
`;

const Create = () => {
    const sdk = useAppSdk();
    const { t } = useTranslation();
    const { defaultWalletVersion } = useAppContext();
    const { mutateAsync: createWalletsAsync, isLoading: isCreateWalletLoading } =
        useCreateAccountMnemonic();
    const { mutateAsync: renameWallet, isLoading: renameLoading } = useMutateRenameAccount();

    const [mnemonic, setMnemonic] = useState<string[] | undefined>();
    const [createdAccount, setCreatedAccount] = useState<Account | undefined>(undefined);

    const [creatingAnimationPassed, setCreatingAnimationPassed] = useState(false);
    const [infoPagePassed, setInfoPagePassed] = useState(false);
    const [wordsPagePassed, setWordsPagePassed] = useState(false);
    const [editNamePagePassed, setEditNamePagePassed] = useState(false);
    const [notificationsSubscribePagePassed, setPassNotification] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            mnemonicNew(24).then(value => setMnemonic(value));
        }, 1500);
    }, []);

    useEffect(() => {
        if (mnemonic) {
            setTimeout(() => {
                setCreatingAnimationPassed(true);
            }, 1500);
        }
    }, [mnemonic]);

    if (!mnemonic) {
        return <IconPage icon={<GearLottieIcon />} title={t('create_wallet_generating')} />;
    }

    if (!creatingAnimationPassed) {
        return <IconPage icon={<CheckLottieIcon />} title={t('create_wallet_generated')} />;
    }

    if (!infoPagePassed) {
        return (
            <>
                <GlobalStyle />
                <IconPage
                    logOut
                    icon={<WriteLottieIcon />}
                    title={t('create_wallet_title')}
                    description={t('create_wallet_caption')}
                    button={
                        <GradientButton
                            size="large"
                            fullWidth
                            primary
                            marginTop
                            onClick={() => setInfoPagePassed(true)}
                        >
                            {t('continue')}
                        </GradientButton>
                    }
                />
            </>
        );
    }

    if (!wordsPagePassed) {
        return (
            <>
                <GlobalStyle />
                <Worlds
                    mnemonic={mnemonic}
                    onBack={() => setInfoPagePassed(false)}
                    onCheck={() => setWordsPagePassed(true)}
                />
            </>
        );
    }

    if (!createdAccount) {
        return (
            <>
                <GlobalStyle />
                <Check
                    mnemonic={mnemonic}
                    onBack={() => setWordsPagePassed(false)}
                    onConfirm={() => {
                        createWalletsAsync({
                            mnemonic,
                            versions: [defaultWalletVersion],
                            selectAccount: true
                        }).then(setCreatedAccount);
                    }}
                    isLoading={isCreateWalletLoading}
                />
            </>
        );
    }

    if (!editNamePagePassed) {
        return (
            <>
                <GlobalStyle />
                <UpdateWalletName
                    name={createdAccount.name}
                    submitHandler={val => {
                        renameWallet({
                            id: createdAccount.id,
                            ...val
                        }).then(newAcc => {
                            setEditNamePagePassed(true);
                            setCreatedAccount(newAcc);
                        });
                    }}
                    walletEmoji={createdAccount.emoji}
                    isLoading={renameLoading}
                />
            </>
        );
    }

    if (sdk.notifications && !notificationsSubscribePagePassed) {
        return (
            <>
                <GlobalStyle />
                <Subscribe
                    wallet={createdAccount.activeTonWallet}
                    mnemonic={mnemonic}
                    onDone={() => setPassNotification(true)}
                />
            </>
        );
    }

    return <FinalView />;
};

export default Create;
