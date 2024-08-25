import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { ListBlock, ListItem, ListItemPayload } from '../List';
import { Body1, Label1 } from '../Text';

export interface SettingsItem {
    name: string;
    secondary?: string;
    action: (item: SettingsItem) => void;
    icon?: React.ReactNode; // Made icon optional
    iconColor?: string;
    preIcon?: React.ReactNode;
}

export interface SettingsListProps {
    items: SettingsItem[];
    className?: string;
    isDisabled?: boolean;
    loading?: boolean;
}

const Icon = styled(Label1)<{ color?: string }>`
    display: flex;
    margin: -3px 0;
`;

const Secondary = styled(Body1)`
    color: ${props => props.theme.textSecondary};
`;

const Text = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ListItemStyled = styled(ListItem)<{ isDisabled?: boolean }>`
    background-color: white; /* Entire ListItem has a white background */
    padding: 5px; /* Optional: Add padding for content spacing */

    /* Prevent color change on hover */
    &:hover {
        background-color: white; /* Ensure background color stays the same on hover */
    }

    ${p =>
        p.isDisabled &&
        css`
            opacity: 0.6;
            cursor: not-allowed;
        `}
`;

const ListBlockStyled = styled(ListBlock)<{ isDisabled?: boolean }>`
    ${p =>
        p.isDisabled &&
        css`
            opacity: 0.6;

            & > * {
                cursor: not-allowed;
            }
        `}
`;

export const SettingsList: FC<SettingsListProps> = React.memo(
    ({ items, className, isDisabled }) => {
        return (
            <ListBlockStyled isDisabled={isDisabled} className={className}>
                {items.map(item => (
                    <ListItemStyled
                        key={item.name}
                        isDisabled={isDisabled}
                        onClick={() => {
                            if (!isDisabled) {
                                item.action(item);
                            }
                        }}
                    >
                        <ListItemPayload>
                            <Text>
                                {item.preIcon}
                                {/* Apply bold styling using strong tag directly */}
                                <Label1>
                                    {item.name === 'settings_delete_account' ? (
                                        <strong>{item.name}</strong>
                                    ) : (
                                        item.name
                                    )}
                                </Label1>
                                {item.secondary && <Secondary>{item.secondary}</Secondary>}
                            </Text>
                            {item.icon && <Icon color={item.iconColor}>{item.icon}</Icon>}
                        </ListItemPayload>
                    </ListItemStyled>
                ))}
            </ListBlockStyled>
        );
    }
);
