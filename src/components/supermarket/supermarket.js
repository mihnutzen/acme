import notice from '../notice/notice.js';
import basket from '../basket/basket.js';
import product from '../product/product.js';

import './supermarket.scss';

const LOW_STOCK_COUNT = 10;

export default function setupSupermarket({ products, offers, basketStore, ee }) {
  const supermarket = document.createElement('div');
  supermarket.className = 'supermarket';
  
  const logo = document.createElement('h1');
  logo.innerHTML = 'ACME Supermarket';
  logo.className = 'logo';

  supermarket.appendChild(logo);

  if (products.length < LOW_STOCK_COUNT) {
    supermarket.appendChild(notice(products.length, offers));
  }

  products.map(p => supermarket.appendChild(product(p, basketStore)));

  const supermarketBasket = basket(basketStore, ee);
  supermarket.appendChild(supermarketBasket);

  return supermarket;
}