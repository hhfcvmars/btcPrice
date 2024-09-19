import React, { useState } from 'react';
import './Wizz.css'; // 确保创建并导入这个CSS文件

function App() {
  const [amount, setAmount] = useState('');

  const calculatePrices = () => {
    const baseAmount = parseFloat(amount);
    if (isNaN(baseAmount)) return [];

    return Array.from({ length: 30 }, (_, i) => {
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
      <h1 className='title'>价格涨跌计算器</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="输入金额"
        className="amount-input"
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>百分比</th>
              <th>涨价</th>
              <th>跌价</th>
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