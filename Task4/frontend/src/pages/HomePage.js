import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('homePage.title')}</h1> {/* Додайте переклад */}
      <p>{t('homePage.welcomeText')}</p>
    </div>
  );
};
export default HomePage;