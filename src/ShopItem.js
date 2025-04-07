import React from 'react';

function ShopItem({ item, onPurchase, canBuy }) {
  return (
    <div className={`shop-item ${!canBuy ? 'disabled' : ''}`}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Цена: {item.price} коинов</p>
      <button onClick={onPurchase} disabled={!canBuy}>
        Купить
      </button>
    </div>
  );
}

export default ShopItem;
