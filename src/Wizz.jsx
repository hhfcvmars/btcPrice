import React, { useState, useContext, useEffect } from 'react';
import './Wizz.css';
import { Helmet } from 'react-helmet';
import { LanguageContext } from './LanguageContext.jsx';
import { translations } from './translations';

function App() {
  const [amount, setAmount] = useState('');
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    async function setDefaultLanguage() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        const isChina = await checkIfIpIsFromChina(ip);
        setLanguage(isChina ? 'zh' : 'en');
      } catch (error) {
        console.error('Error setting default language:', error);
      }
    }
    setDefaultLanguage();
  }, [setLanguage]);

  async function checkIfIpIsFromChina(ip) {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      return data.country_code === 'CN';
    } catch (error) {
      console.error('Error checking IP location:', error);
      return false;
    }
  }

  const calculatePrices = () => {
    const baseAmount = parseFloat(amount);
    if (isNaN(baseAmount)) return [];

    return Array.from({ length: 100 }, (_, i) => {
      const percentage = (i + 1) / 100;
      const increase = baseAmount * (1 + percentage);
      const decrease = baseAmount * (1 - percentage);
      return { 
        percent: i + 1, 
        increase: increase.toFixed(2), 
        decrease: decrease.toFixed(2) 
      };
    });
  };

  return (
    <div className="App">
      <Helmet>
        <title>{t.title}</title>
      </Helmet>

      <div className="language-select-container">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>

      <h1 className='title'>{t.title}</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={t.inputPlaceholder}
        className="amount-input"
      />
  
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t.percent}</th>
              <th>{t.increase}</th>
              <th>{t.decrease}</th>
            </tr>
          </thead>
          <tbody>
            {calculatePrices().map(({ percent, increase, decrease }) => (
              <tr key={percent}>
                <td>{percent}%</td>
                <td className='increase'>{increase}</td>
                <td className='decrease'>{decrease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  

    </div>
  );
}

export default App;