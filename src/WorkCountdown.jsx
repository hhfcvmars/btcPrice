import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import './WorkCountdown.css';

export default function WorkCountdown() {
  const [birthDate, setBirthDate] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (birthDate) {
      const timer = setInterval(() => {
        const now = new Date();
        const retirementDate = new Date(birthDate.getFullYear() + 62, birthDate.getMonth() + 4, birthDate.getDate());
        
        if (now >= retirementDate) {
          setCountdown('已到退休年龄！');
          clearInterval(timer);
        } else {
          const timeLeft = retirementDate - now;
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          setCountdown(`${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [birthDate]);

  const handleDateChange = (date) => {
    setBirthDate(date);
  };

  return (
    <div className="work-countdown">
      <h1>打工倒计时</h1>
      <div className="date-input-container">
        <label htmlFor="birthDate">出生日期：</label>
        <DatePicker
          onChange={handleDateChange}
          value={birthDate}
          format="yyyy-MM-dd"
          locale="zh-CN"
          dayPlaceholder="日"
          monthPlaceholder="月"
          yearPlaceholder="年"
          calendarIcon={null}
          clearIcon={null}
          formatDate={(date) => format(date, 'yyyy年MM月dd日', { locale: zhCN })}
          className="custom-datepicker"
        />
      </div>
      {countdown && (
        <div className="countdown-display">
          <h2>距离退休还有：</h2>
          <p>{countdown}</p>
        </div>
      )}
    </div>
  );
}