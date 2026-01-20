import React, { useState, useEffect } from 'react';
import './App.css';
import januaryImg from './assets/images/january.jpg';
import februaryImg from './assets/images/february.jpg';
import marchImg from './assets/images/march.jpg';
import aprilImg from './assets/images/april.jpg';
import mayImg from './assets/images/may.jpg';
import juneImg from './assets/images/june.jpg';
import julyImg from './assets/images/july.jpg';
import augustImg from './assets/images/august.jpg';
import septemberImg from './assets/images/september.jpg';
import octoberImg from './assets/images/october.jpg';
import novemberImg from './assets/images/november.jpg';
import decemberImg from './assets/images/december.jpg';
import holidayImg from './assets/images/holiday.jpg';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timerMode, setTimerMode] = useState('summer'); // 'summer' или 'vacation'

  // Данные для каждого месяца
  const monthlyThemes = {
    0: { // Январь
      bgColor: '#e6f7ff',
      motivation: '❄️ Новый год прошел, но лето уже не за горами!',
      image: januaryImg,
      title: 'до летних каникул'
    },
    1: { // Февраль
      bgColor: '#f9f0ff',
      motivation: '⛄ Зима постепенно сдает позиции, лето на подходе!',
      image: februaryImg,
      title: 'до летних каникул'
    },
    2: { // Март
      bgColor: '#f0fff9',
      motivation: '🌷 Весна пришла, а значит летние каникулы уже близко!',
      image: marchImg,
      title: 'до летних каникул'
    },
    3: { // Апрель
      bgColor: '#fff9f0',
      motivation: '🌸 Апрельские дожди готовят почву для солнечного лета!',
      image: aprilImg,
      title: 'до летних каникул'
    },
    4: { // Май
      bgColor: '#fff0f5',
      motivation: '🌼 Последний месяц перед каникулами! Держимся!',
      image: mayImg,
      title: 'до летних каникул'
    },
    5: { // Июнь
      bgColor: '#fffacd',
      motivation: '☀️ Ура! Летние каникулы начались!',
      image: juneImg,
      title: 'до конца каникул'
    },
    6: { // Июль
      bgColor: '#e6ffff',
      motivation: '🏖️ Наслаждайся летом! Каникулы в самом разгаре!',
      image: julyImg,
      title: 'до конца каникул'
    },
    7: { // Август
      bgColor: '#f0ffe6',
      motivation: '🌞 Лето в разгаре! Наслаждайся каждым днем!',
      image: augustImg,
      title: 'до конца каникул'
    },
    8: { // Сентябрь
      bgColor: '#fff5e6',
      motivation: '🍂 Учебный год начался, но следующее лето обязательно наступит!',
      image: septemberImg,
      title: 'до летних каникул'
    },
    9: { // Октябрь
      bgColor: '#ffe6e6',
      motivation: '🍁 Осень вступила в права, но следующее лето обязательно наступит!',
      image: octoberImg,
      title: 'до летних каникул'
    },
    10: { // Ноябрь
      bgColor: '#f0f0f0',
      motivation: '🍂 Осень подходит к концу, начинаем обратный отсчет до следующего лета!',
      image: novemberImg,
      title: 'до летних каникул'
    },
    11: { // Декабрь
      bgColor: '#e6f7ff',
      motivation: '🎄 Год заканчивается, а значит новое лето уже на подходе!',
      image: decemberImg,
      title: 'до летних каникул'
    }
  };

  function calculateTimeLeft() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    
    let targetDate;
    let mode;
    
    // Определяем режим таймера
    if (currentMonth >= 5 && currentMonth <= 7) { // Июнь-Август (5-7)
      // Летние каникулы: отсчитываем до 1 сентября
      mode = 'vacation';
      targetDate = new Date(currentYear, 8, 1); // 1 сентября
      
      // Если уже сентябрь, переключаемся на следующий год
      if (now >= targetDate) {
        mode = 'summer';
        targetDate = new Date(currentYear + 1, 5, 1); // 1 июня следующего года
      }
    } else {
      // Не лето: отсчитываем до 1 июня
      mode = 'summer';
      targetDate = new Date(currentYear, 5, 1); // 1 июня
      
      // Если уже июнь, значит лето началось
      if (now >= targetDate) {
        mode = 'vacation';
        targetDate = new Date(currentYear, 8, 1); // 1 сентября
      }
    }
    
    const difference = targetDate - now;
    
    // Если разница отрицательная (уже прошла целевая дата)
    if (difference <= 0) {
      // Пересчитываем для следующего периода
      if (mode === 'summer') {
        targetDate = new Date(currentYear + 1, 5, 1);
        mode = 'summer';
      } else {
        targetDate = new Date(currentYear, 8, 1);
        mode = 'vacation';
      }
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { 
      days, 
      hours, 
      minutes, 
      seconds,
      mode,
      targetDate: targetDate.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      })
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      setCurrentDate(new Date());
      setTimerMode(newTimeLeft.mode);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentMonth = currentDate.getMonth();
  const currentTheme = monthlyThemes[currentMonth];

  // Определяем, нужно ли показывать таймер
  const shouldShowTimer = !(currentMonth === 5 && timeLeft?.days === 0);

  return (
    <div 
      className="app-container"
      style={{ backgroundColor: currentTheme.bgColor }}
    >
      <div className="content">
        <h1 className="motivation-text">
          {currentTheme.motivation}
        </h1>
        
        {shouldShowTimer ? (
          <div className="countdown-container">
            <div className="countdown">
              <div className="time-unit">
                <span className="time-value">{timeLeft?.days || 0}</span>
                <span className="time-label">дней</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{timeLeft?.hours || 0}</span>
                <span className="time-label">часов</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{timeLeft?.minutes || 0}</span>
                <span className="time-label">минут</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{timeLeft?.seconds || 0}</span>
                <span className="time-label">секунд</span>
              </div>
            </div>
          
            <div className="mode-indicator">
              {timerMode === 'summer' ? (
                <span className="mode-summer">До летних каникул  </span>
              ) : (
                <span className="mode-vacation">До конца каникул</span>
              )}
            </div>
          </div>
        ) : (
          // Только 1 июня в 00:00 показываем это сообщение
          <div className="summer-started">
            <h1 className="summer-text">🎉 Ура! Летние каникулы начались! 🎉</h1>
            <p className="summer-subtext">Наслаждайся отдыхом! Завтра начнется отсчет до 1 сентября ☀️</p>
              <div className="image-container">
          <img 
            src={holidayImg} 
            alt="Тематическое изображение"
            className="theme-image"
          />
          </div>
          </div>
          
        )}

        <div className="image-container">
          <img 
            src={currentTheme.image} 
            alt="Тематическое изображение"
            className="theme-image"
          />
          <div className="date-info">
            <p className="month-indicator">
              📅 Сейчас {getMonthName(currentMonth)} {currentDate.getFullYear()} года
            </p>
            <div className="season-info">
              {currentMonth >= 5 && currentMonth <= 7 ? (
                <span className="season-summer">☀️ Идет лето (каникулы)</span>
              ) : currentMonth >= 8 && currentMonth <= 10 ? (
                <span className="season-autumn">🍂 Идет осень </span>
              ) : currentMonth === 11 || currentMonth <= 1 ? (
                <span className="season-winter">❄️ Идет зима </span>
              ) : (
                <span className="season-spring">🌸 Уже весна </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для получения названия месяца
function getMonthName(monthIndex) {
  const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ];
  return months[monthIndex];
}

export default App;