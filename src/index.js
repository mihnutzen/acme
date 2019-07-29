import Basket from './store/basket.js';
import EventEmitter from 'events';

import 'reset-css';
import './styles/app.scss';

import products from './data/products.json';
import offers from './data/offers.json';

import supermarket from './components/supermarket/supermarket.js';

function app() {
  var ee = new EventEmitter();
  const basketStore = new Basket(offers, ee);

  return supermarket({ products, offers, basketStore, ee });
}

document.body.appendChild(app());