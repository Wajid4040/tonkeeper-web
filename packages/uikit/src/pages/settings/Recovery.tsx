import { AuthState } from '@tonkeeper/core/dist/entries/password';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BackButtonBlock } from '../../components/BackButton';
import { Body1, Body2, H2 } from '../../components/Text';
import { WorldNumber, WorldsGrid } from '../../components/create/Words';
import { useAppContext, useWalletContext } from '../../hooks/appContext';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { getMnemonic } from '../../state/mnemonic';
import { useCheckTouchId } from "../../state/password";

export const ActiveRecovery = () => {
    const wallet = useWalletContext();
    return <RecoveryContent publicKey={wallet.publicKey} />;
};

export const Recovery = () => {
    const { publicKey } = useParams();
    if (publicKey) {
        return <RecoveryContent publicKey={publicKey} />;
    } else {
        return <ActiveRecovery />;
    }
};

const useMnemonic = (publicKey: string, auth: AuthState) => {
    const [mnemonic, setMnemonic] = useState<string[] | undefined>(undefined);
    const sdk = useAppSdk();
    const navigate = useNavigate();
    const { mutateAsync: checkTouchId } = useCheckTouchId();

    useEffect(() => {
        (async () => {
            try {
                setMnemonic(await getMnemonic(sdk, publicKey, checkTouchId));
            } catch (e) {
                navigate(-1);
            }
        })();
    }, [publicKey]);

    return mnemonic;
};

const Wrapper = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;

    flex-direction: column;
    padding: 0 1rem;
    position: relative;
`;

const Block = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;

    position: relative;
`;

const Title = styled(H2)`
    user-select: none;
    padding: 0 2rem;
`;

const Body = styled(Body2)`
    text-align: center;
    color: ${props => props.theme.textSecondary};
    user-select: none;
`;

const RecoveryContent: FC<{ publicKey: string }> = ({ publicKey }) => {
    const { auth } = useAppContext();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const mnemonic = useMnemonic(publicKey, auth);

    const onBack = () => {
        navigate(-1);
    };

    if (!mnemonic) {
        return <Wrapper />;
    }

    return (
        <Wrapper>
            <BackButtonBlock onClick={onBack} />
            <Block>
                <Title>{t('secret_words_title')}</Title>
                <Body>{t('secret_words_caption')}</Body>
            </Block>

            <WorldsGrid>
                {mnemonic.map((world, index) => (
                    <Body1 key={index}>
                        <WorldNumber> {index + 1}.</WorldNumber> {world}{' '}
                    </Body1>
                ))}
            </WorldsGrid>
        </Wrapper>
    );
};
