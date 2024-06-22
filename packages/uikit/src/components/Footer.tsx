import { FC, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useTranslation } from '../hooks/translation';
import { scrollToTop } from '../libs/common';
import { AppRoute } from '../libs/routes';
import { ActivityIcon, BrowserIcon, SettingsIcon, WalletIcon } from './NavigationIcons';
import { Label3 } from './Text';
const WalletImage = styled.img`
    width: 30px; /* Adjust size as needed */
    height: 30px; /* Adjust size as needed */
`;

const Button = styled.div<{ active: boolean }>`
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 0.25rem;
    width: 20%;

    color: ${props => props.theme.tabBarInactiveIcon};

    ${props =>
        props.active &&
        css`
            color: ${p => p.theme.tabBarActiveIcon};
        `}
`;

const Block = styled.div<{ standalone?: boolean; sticky?: boolean }>`
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    bottom: 0;
    padding: 1rem;
    width: var(--app-width);
    border-top: 1px solid #1B5853; /* Border on the upper side only */
    max-width: 548px;
    box-sizing: border-box;
    overflow: visible !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    z-index: 3;
    border-top-right-radius: 18px; /* Border radius for the top right corner */
    border-top-left-radius: 18px; /* Border radius for the top right corner */
    
    background-color: ${props => props.theme.backgroundPage};

    ${props =>
        props.sticky
            ? css`
                  position: sticky;
              `
            : css`
                  position: fixed;
              `}

    ${props =>
        props.standalone &&
        css`
            padding-bottom: 2rem;
        `}
`;

export const FooterGlobalStyle = createGlobalStyle`
  body:not(.bottom) ${Block} {
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: ${props => props.theme.separatorCommon};
      position: absolute;
      bottom: 100%;
    }
  }
`;

export const Footer: FC<{ standalone?: boolean; sticky?: boolean }> = ({ standalone, sticky }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const active = useMemo<AppRoute>(() => {
        if (location.pathname.includes(AppRoute.activity)) {
            return AppRoute.activity;
        }
        if (location.pathname.includes(AppRoute.settings)) {
            return AppRoute.settings;
        }
        if (location.pathname.includes(AppRoute.browser)) {
            return AppRoute.browser;
        }
        return AppRoute.home;
    }, [location.pathname]);

    const handleClick = useCallback(
        (route: AppRoute) => {
            if (location.pathname !== route) {
                return navigate(route);
            } else {
                scrollToTop();
            }
        },
        [location.pathname]
    );

    return (
        <Block standalone={standalone} sticky={sticky}>
            <Button active={active === AppRoute.home} onClick={() => handleClick(AppRoute.home)}>
            <WalletImage src="https://i.ibb.co/VHBbq6W/Whats-App-Image-2024-05-27-at-2-38-05-PM.jpg" alt="Wallet Icon" />
            </Button>
            <Button
                active={active === AppRoute.activity}
                onClick={() => handleClick(AppRoute.activity)}
            >
            <WalletImage src="https://i.ibb.co/0M8rNjn/Whats-App-Image-2024-05-27-at-2-33-01-PM.jpg" alt="Wallet Icon" />
            </Button>
            <Button
                active={active === AppRoute.browser}
                onClick={() => handleClick(AppRoute.browser)}
            >
            <WalletImage src="https://i.ibb.co/9r6xw1S/Whats-App-Image-2024-05-27-at-2-35-07-PM.jpg" alt="Wallet Icon" />
            </Button>
            <Button
                active={active === AppRoute.settings}
                onClick={() => handleClick(AppRoute.settings)}
            >
            <WalletImage src="https://i.ibb.co/RGK5DfF/Whats-App-Image-2024-05-27-at-2-23-44-PM.jpg" alt="Wallet Icon" />
            </Button>
        </Block>
    );
};
