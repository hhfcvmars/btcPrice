import React, { useState, useEffect } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears } from 'date-fns';
import './WorkCountdown.css';
import qrCode from './assets/code.png'; // 添加这行

export default function WorkCountdown() {
  const [birthDate, setBirthDate] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [dateInput, setDateInput] = useState({
    year: '',
    month: '',
    day: ''
  });
  const [dailySalary, setDailySalary] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (remainingDays && dailySalary) {
      const amount = remainingDays * parseFloat(dailySalary);
      setTotalAmount(amount.toFixed(2));
    } else {
      setTotalAmount(null);
    }
  }, [remainingDays, dailySalary]);

  const handleSalaryChange = (e) => {
    setDailySalary(e.target.value);
  };

  useEffect(() => {
    const { year, month, day } = dateInput;
    if (year && month && day) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        setBirthDate(date);
      }
    }
  }, [dateInput]);

  useEffect(() => {
    if (birthDate) {
      const calculateCountdown = () => {
        const retirementDate = addYears(birthDate, 60);
        const now = new Date();

        if (now >= retirementDate) {
          setCountdown('您已经到达退休年龄！');
        } else {
          const totalSeconds = Math.floor((retirementDate - now) / 1000);
          const days = Math.floor(totalSeconds / (3600 * 24));
          const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          setCountdown(`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`);
          setRemainingDays(days);
        }
      };

      calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000); // 每秒更新一次

      return () => clearInterval(timer);
    }
  }, [birthDate]);

  return (
    <div className="work-countdown">
      <h1>打工倒计时</h1>
      <div className="date-input-container">
        <label>出生日期：</label>
        <div className="input-group">
          <input
            type="text"
            name="year"
            value={dateInput.year}
            onChange={handleInputChange}
            placeholder="2000"
          />
          <span>年</span>
          <input
            type="text"
            name="month"
            value={dateInput.month}
            onChange={handleInputChange}
            placeholder="01"
          />
          <span>月</span>
          <input
            type="text"
            name="day"
            value={dateInput.day}
            onChange={handleInputChange}
            placeholder="01"
          />
          <span>日</span>
        </div>
      </div>
      {countdown && (
        <div className="countdown-display">
          <h2>距离退休还有：</h2>
          <p className="countdown-value">{countdown}</p>
        </div>
      )}
         <div className="salary-input-container">
        <label>平均日薪：</label>
        <input
          type="number"
          value={dailySalary}
          onChange={handleSalaryChange}
          placeholder="请输入日薪"
        />
        <span>元</span>
      </div>
      {totalAmount && (
        <div className="total-amount-display">
          <h2>预计总收入：</h2>
          <p className="total-amount-value">{totalAmount} 元</p>
        </div>
      )}
       <div className="qr-code-container">
        <img src= {qrCode} width={128} height={128}/>
      </div>
      <h2>长按二维码，进入小程序</h2>
    </div>
  );
}