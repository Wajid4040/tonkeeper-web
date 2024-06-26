import { FC, PropsWithChildren, useState } from 'react';
import styled, { css } from 'styled-components';
import { CenterContainer } from '../../components/Layout';
import { Description } from '../../components/create/Description';
import { ImportNotification } from '../../components/create/ImportNotification';
import { Button } from '../../components/fields/Button';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';

const Block = styled.div<{ fullHeight: boolean }>`
    display: flex;
    flex-direction: column;
    min-height: var(--app-height);
    padding: 1rem 1rem;
    box-sizing: border-box;
    position: relative;

    ${p =>
        p.theme.displayType === 'full-width' &&
        css`
            height: auto;
            min-height: unset;
            position: static;
        `}

    ${props =>
        props.fullHeight
            ? css`
                  justify-content: space-between;
              `
            : css`
                  justify-content: center;
              `}
`;

export const InitializeContainer: FC<
    PropsWithChildren<{ fullHeight?: boolean; className?: string }>
> = ({ fullHeight = true, children, className }) => {
    return (
        <Block fullHeight={fullHeight} className={className}>
            {children}
        </Block>
    );
};

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`;

const Logo = styled.img`
    width: 180px; // Increased size
    height: 180px;
    margin-bottom: 70px; // Added margin bottom
`;

const CenteredDescription = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const Initialize: FC = () => {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const sdk = useAppSdk();

    const onClick = () => {
        sdk.requestExtensionPermission().then(() => setOpen(true));
    };

    return (
        <CenterContainer>
            <LogoContainer>
                <Logo src="https://i.ibb.co/XJC4snV/IMG-7537.png" alt="Logo" />
            </LogoContainer>
            <CenteredDescription>
                <Description
                    title="Welcome to MegaPayer"
                    description="With the advanced capabilities of The Open Network (TON), enjoy lightning-fast transaction speeds and unparalleled security."
                />
            </CenteredDescription>
            <Button size="large" fullWidth primary marginTop onClick={onClick}>
                {t('intro_continue_btn')}
            </Button>
            <ImportNotification isOpen={isOpen} setOpen={setOpen} />
        </CenterContainer>
    );
};

export default Initialize;
