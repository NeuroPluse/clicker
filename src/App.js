import React, { useState, useEffect } from 'react';
import './style.css';
import ShopItem from './ShopItem';

const initialUpgrades = [
    { name: 'Авто гос долг', price: 69, effect: 'autoClick', count: 0, increment: 1.5, description: 'Фармит гос долг за тебя.' },
    { name: 'Курсор', price: 169, effect: 'increaseClick', count: 0, increment: 2, description: 'Увеличивает гос долг за клик.' },
    { name: 'Множитель', price: 269, effect: 'multiplyCoins', count: 0, increment: 2, description: '2х долга за клик.' },
    { name: 'Буст гос долга', price: 369, effect: 'speedBoost', count: 0, increment: 1.2, description: 'Ускоряет экономическую составляющую США.' },
    { name: 'Большой гос долг', price: 569, effect: 'bigClick', count: 0, increment: 5, description: '6х долгов за клик.' },
    { name: 'Скорость добычи гос долга', price: 1069, effect: 'fasterAutoClick', count: 0, increment: 1.3, description: 'Увеличивает скорость добычы денег для США.' },
    { name: 'Критический гос долг', price: 2069, effect: 'criticalClick', count: 0, increment: 1.5, description: 'Дает шанс на критический удар с увеличением долга.' }
];

function App() {
  const [coins, setCoins] = useState(0);
  const [coinsPerClick, setCoinsPerClick] = useState(1);
  const [autoClickInterval, setAutoClickInterval] = useState(null);
  const [upgrades, setUpgrades] = useState(initialUpgrades);

  useEffect(() => {
    if (autoClickInterval) {
      clearInterval(autoClickInterval);
    }
    if (upgrades.some(upgrade => upgrade.effect === 'autoClick' && upgrade.count > 0)) {
      const interval = setInterval(() => {
        setCoins(prevCoins => prevCoins + upgrades.find(upgrade => upgrade.effect === 'autoClick').count);
      }, 1000);
      setAutoClickInterval(interval);
    }
  }, [upgrades]);

  const handleClickCharacter = () => {
    setCoins(prevCoins => prevCoins + coinsPerClick);
  };

  const handleUpgradePurchase = (index) => {
    const item = upgrades[index];
    if (coins >= item.price) {
      setCoins(prevCoins => prevCoins - item.price);
      const newUpgrades = [...upgrades];
      newUpgrades[index] = {
        ...item,
        price: Math.ceil(item.price * item.increment),
        count: item.count + 1
      };
      setUpgrades(newUpgrades);

      applyUpgradeEffect(item.effect);
    } else {
      alert('Недостаточно Гос долга для покупки!');
    }
  };

  const applyUpgradeEffect = (effect) => {
    switch (effect) {
      case 'increaseClick':
        setCoinsPerClick(prevCoinsPerClick => prevCoinsPerClick + 1);
        break;
      case 'multiplyCoins':
        setCoinsPerClick(prevCoinsPerClick => prevCoinsPerClick * 2);
        break;
      case 'bigClick':
        setCoinsPerClick(prevCoinsPerClick => prevCoinsPerClick + 5);
        break;
      case 'criticalClick':
        setCoinsPerClick(prevCoinsPerClick => prevCoinsPerClick * 1.5);
        break;
      default:
        break;
    }
  };

  const progress = Math.min((coins / 1000) * 100, 100);

  return (
    <div id="game">
      <h1>Кликер гос долга США</h1>

      <div id="progress-bar">
        <div id="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div id="counter">Гос долг: {coins}</div>

      <div id="character-container">
        <img
          id="character"
          src="img/money.png"
          alt="лавэ"
          onClick={handleClickCharacter}
        />
      </div>

      <div id="shop-menu">
        <h2> Магазин улучшений</h2>
        {upgrades.map((item, index) => (
          <ShopItem
            key={index}
            item={item}
            onPurchase={() => handleUpgradePurchase(index)}
            canBuy={coins >= item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

