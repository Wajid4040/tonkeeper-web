import React, { FC } from 'react';
import { BrowserRoute } from '../../libs/routes';
import { Route, Routes } from 'react-router-dom';
import { CategoryPage } from './CategoryPage';
import { BrowserRecommendationsPage } from './BrowserRecommendationsPage';

const DefaultPage: FC = () => {
    return (
        <iframe
            src="https://megapayer.io/"
            title="Megapayer"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
    );
};

const BrowserPage: FC = () => {
    return (
        <Routes>
            <Route path={BrowserRoute.category + '/:id'} element={<CategoryPage />} />
            <Route path="*" element={<DefaultPage />} />
        </Routes>
    );
};

export default BrowserPage;
