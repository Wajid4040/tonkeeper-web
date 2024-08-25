import { FC } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../hooks/appContext';
import { useOnImportAction } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { AppRoute, ImportRoute } from '../../libs/routes';
import { ColumnText } from '../Layout';
import { Notification } from '../Notification';
import { Body1, H2 } from '../Text';
import {
    AddIcon,
    ImportIcon,
    KeystoneIcon,
    LedgerIcon,
    RightIcon,
    SignerIcon
} from './ImportIcons';

const Title = styled(H2)`
    user-select: none;
  
`;

const BodyText = styled(Body1)`
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
    background: #4aa389;
    cursor: pointer;
    align-items: center;
    margin: 0 16px 16px;
    border-radius: ${props => props.theme.cornerLarge};
`;

const ButtonIcon = styled.div`
    color: white !important; /* Force color to white */
    height: 28px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
`;

const ColumnTextStyled = styled(ColumnText)`
    flex-grow: 1;
    color: white !important; /* Ensure text color is white */

    /* Target secondary text specifically */
    & > span {
        color: white !important; /* Ensure secondary text color is white */
    }
`;

const ColumnTextWhite = styled(ColumnText)`
    color: white !important; /* Explicitly set color to white for headings and subtitles */

    /* Target secondary text specifically */
    & > span {
        color: white !important; /* Ensure secondary text color is white */
    }
`;

export const ImportNotification: FC<{
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}> = ({ isOpen, setOpen }) => {
    const { t } = useTranslation();
    const onImport = useOnImportAction();
    const { hideSigner, hideLedger, hideKeystone } = useAppContext();

    return (
        <Notification isOpen={isOpen} handleClose={() => setOpen(false)}>
            {onClose => (
                <div>
                    <TextBlock>
                        <Title>{t('import_add_wallet')}</Title>
                        <BodyText>{t('import_add_wallet_description')}</BodyText>
                    </TextBlock>
                    <ButtonBlock
                        onClick={() => {
                            onClose(() => onImport(AppRoute.import + ImportRoute.create));
                        }}
                    >
                        <ButtonIcon>
                            <AddIcon />
                        </ButtonIcon>
                        <ColumnTextWhite
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
                            onClose(() => onImport(AppRoute.import + ImportRoute.import));
                        }}
                    >
                        <ButtonIcon>
                            <ImportIcon />
                        </ButtonIcon>
                        <ColumnTextWhite
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
                                onClose(() => onImport(AppRoute.import + ImportRoute.signer));
                            }}
                        >
                            <ButtonIcon>
                                <SignerIcon />
                            </ButtonIcon>
                            <ColumnTextWhite
                                noWrap
                                text={t('import_signer')}
                                secondary={t('import_signer_description')}
                            />
                            <ButtonIcon>
                                <RightIcon />
                            </ButtonIcon>
                        </ButtonBlock>
                    )}
                    {hideKeystone === true ? null : (
                        <ButtonBlock
                            onClick={() => {
                                onClose(() => onImport(AppRoute.import + ImportRoute.keystone));
                            }}
                        >
                            <ButtonIcon>
                                <KeystoneIcon />
                            </ButtonIcon>
                            <ColumnTextStyled
                                text={t('keystone_pair_title')}
                                secondary={t('keystone_pair_subtitle')}
                            />
                            <ButtonIcon>
                                <RightIcon />
                            </ButtonIcon>
                        </ButtonBlock>
                    )}
                    {hideLedger === true ? null : (
                        <ButtonBlock
                            onClick={() => {
                                onClose(() => onImport(AppRoute.import + ImportRoute.ledger));
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
                    )}
                </div>
            )}
        </Notification>
    );
};
