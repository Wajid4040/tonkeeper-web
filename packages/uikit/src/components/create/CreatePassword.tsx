import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { CenterContainer } from '../Layout';
import { H2 } from '../Text';
import { Button as BaseButton } from '../fields/Button';
import { Input as BaseInput } from '../fields/Input';
import { validatePassword } from '@tonkeeper/core/dist/service/passwordService';

const Block = styled.form`
    display: flex;
    text-align: center;
    gap: 1rem;
    flex-direction: column;
`;

const Input = styled(BaseInput)`
    background-color: white;
    
    &:hover,
    &:focus {
        border-color: #4ba489;
    }
`;

const GradientButton = styled(BaseButton)`
    background: linear-gradient(90deg, #6ddcb2, #388573);
    border: none;
    color: white;
    box-shadow: 0px 8px 20px #c5ffdb;
    &:hover {
        background: linear-gradient(90deg, #388573, #6ddcb2);
    }
`;

export const CreatePassword: FC<{
    afterCreate: (password: string) => void;
    isLoading?: boolean;
    className?: string;
}> = ({ afterCreate, isLoading, className }) => {
    const { t } = useTranslation();
    const sdk = useAppSdk();

    const ref = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | undefined>(undefined);

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const onCreate: React.FormEventHandler<HTMLFormElement> = async e => {
        e.stopPropagation();
        e.preventDefault();
        if (!validatePassword(password)) {
            sdk.hapticNotification('error');
            return setError('password');
        }
        if (password !== confirm) {
            sdk.hapticNotification('error');
            return setError('confirm');
        }

        return afterCreate(password);
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    return (
        <CenterContainer className={className}>
            <Block onSubmit={onCreate}>
                <H2>{t('Create_password')}</H2>
                <Input
                    ref={ref}
                    type="password"
                    label={t('Password')}
                    value={password}
                    onChange={value => {
                        setError(undefined);
                        setPassword(value);
                    }}
                    isValid={error == null}
                    helpText={error === 'password' ? t('MinPassword') : undefined} // Show help text only for password error
                />

                <Input
                    type="password"
                    label={t('ConfirmPassword')}
                    value={confirm}
                    onChange={value => {
                        setError(undefined);
                        setConfirm(value);
                    }}
                    isValid={error !== 'confirm'}
                    helpText={error === 'confirm' ? t('PasswordDoNotMatch') : undefined} // Show help text only for confirm error
                />

                <GradientButton
                    size="large"
                    fullWidth
                    primary
                    marginTop
                    loading={isLoading}
                    disabled={!!error}
                    type="submit"
                >
                    {t('continue')}
                </GradientButton>
            </Block>
        </CenterContainer>
    );
};
