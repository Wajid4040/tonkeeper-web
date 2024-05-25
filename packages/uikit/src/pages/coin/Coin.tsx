import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../libs/routes';
import { JettonContent } from './Jetton';
import { TonPage } from './Ton';
import { TronPage } from './Tron';
import { MprPage } from './MprPage'; // Import the new MPR page

const CoinPage = () => {
    const navigate = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        if (!name) {
            navigate(AppRoute.home);
        }
    }, [name]);

    if (!name) return <></>;

    if (name === 'tron') {
        return <TronPage />;
    } else if (name === 'ton') {
        return <TonPage />;
    } else if (name === 'mpr') { // Add condition for MPR token
        return <MprPage />;
    } else {
        return <JettonContent jettonAddress={decodeURIComponent(name)} />;
    }
};

export default CoinPage;
