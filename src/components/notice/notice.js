import { removeNode } from '../../utils/utils.js';

import './notice.scss';

const NOTICE_TIME_ON_SCREEN = 10000;

export default function(productsCount, offers) {
  const el = document.createElement('div');
  el.className = 'notice';
  el.innerHTML = `!Low number of products in stock. Only ${productsCount} available. <br />`;
  el.innerHTML += Object.keys(offers).reduce((acc, offerKey) => `${acc} ${offers[offerKey].details} <br />`, '');

  el.onclick = () => { removeNode(el); };

  setTimeout(() => { removeNode(el); }, NOTICE_TIME_ON_SCREEN);

  return el;
}