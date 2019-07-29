import { removeNode } from '../../utils/utils.js';

import './basket.scss';

export default function(basket, ee) {
  const el = document.createElement('div');
  el.className = 'basket';

  const title = document.createElement('h2');
  title.innerHTML = 'Your basket:';

  const total = document.createElement('p');
  total.innerHTML = basket.total();
  total.className = 'total';

  ee.on('product_added', addProductAndRedoTotal(basket, el, total));

  el.appendChild(title);
  el.appendChild(total);

  return el;
}

function basketProduct(data) {
  const el = document.createElement('div');
  el.className = 'item';
  el.innerHTML = `${data.name} - £${data.price}`;

  return el;
}

function addProductAndRedoTotal(basket, el, total) {
  return (product) => {
    removeNode(total);
    el.appendChild(basketProduct(product));
    
    total.innerHTML = `Total: £${basket.total().toFixed(2)}`;
    el.appendChild(total);
  }
}