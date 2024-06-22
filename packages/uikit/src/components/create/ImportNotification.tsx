import { FC } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../hooks/appContext';
import { useOnImportAction } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { AppRoute, ImportRoute } from '../../libs/routes';
import { ColumnText } from '../Layout';
import { Notification } from '../Notification';
import { Body1, H2 } from '../Text';
import { AddIcon, ImportIcon, LedgerIcon, RightIcon, SignerIcon } from './ImportIcons';

const Title = styled(H2)`
    user-select: none;
`;
const BodyText = styled(Body1)`
    color: ${props => props.theme.textSecondary};
    user-select: none;
`;
const TextBlock = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const ButtonBlock = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    background: ${props => props.theme.backgroundContent};
    cursor: pointer;
    align-items: center;
    margin: 0 16px 16px;
    border-radius: ${props => props.theme.cornerLarge};
`;

const ButtonIcon = styled.div`
    color: ${props => props.theme.accentBlue};
    height: 28px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
`;

const ColumnTextStyled = styled(ColumnText)`
    flex-grow: 1;
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #1B5853; // Updated background color
    padding: 2rem;
    border-radius: ${props => props.theme.cornerLarge};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: ${props => props.theme.constantWhite};
    font-size: 1.5rem;
    cursor: pointer;
`;

export const ImportNotification: FC<{
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}> = ({ isOpen, setOpen }) => {
    const { t } = useTranslation();
    const onImport = useOnImportAction();
    const { hideSigner } = useAppContext();

    return (
        <ModalOverlay isOpen={isOpen}>
            <ModalContent>
                <CloseButton onClick={() => setOpen(false)}>&times;</CloseButton>
                <ButtonBlock
                    onClick={() => {
                        onImport(AppRoute.import + ImportRoute.create);
                        setOpen(false);
                    }}
                >
                    <ButtonIcon>
                        <AddIcon />
                    </ButtonIcon>
                    <ColumnText
                        noWrap
                        text={t('import_new_wallet')}
                        secondary={t('import_new_wallet_description')}
                    />
                    <ButtonIcon>
                        <RightIcon />
                    </ButtonIcon>
                </ButtonBlock>
                <ButtonBlock
                    onClick={() => {
                        onImport(AppRoute.import + ImportRoute.import);
                        setOpen(false);
                    }}
                >
                    <ButtonIcon>
                        <ImportIcon />
                    </ButtonIcon>
                    <ColumnText
                        noWrap
                        text={t('import_existing_wallet')}
                        secondary={t('import_existing_wallet_description')}
                    />
                    <ButtonIcon>
                        <RightIcon />
                    </ButtonIcon>
                </ButtonBlock>
                {hideSigner === true ? null : (
                    <ButtonBlock
                        onClick={() => {
                            onImport(AppRoute.import + ImportRoute.signer);
                            setOpen(false);
                        }}
                    >
                        <ButtonIcon>
                            <SignerIcon />
                        </ButtonIcon>
                        <ColumnText
                            noWrap
                            text={t('import_signer')}
                            secondary={t('import_signer_description')}
                        />
                        <ButtonIcon>
                            <RightIcon />
                        </ButtonIcon>
                    </ButtonBlock>
                )}
                <ButtonBlock
                    onClick={() => {
                        onImport(AppRoute.import + ImportRoute.ledger);
                        setOpen(false);
                    }}
                >
                    <ButtonIcon>
                        <LedgerIcon />
                    </ButtonIcon>
                    <ColumnTextStyled
                        text={t('ledger_pair_title')}
                        secondary={t('ledger_pair_subtitle')}
                    />
                    <ButtonIcon>
                        <RightIcon />
                    </ButtonIcon>
                </ButtonBlock>
            </ModalContent>
        </ModalOverlay>
    );
};
