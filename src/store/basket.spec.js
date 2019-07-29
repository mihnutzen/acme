import Basket from './basket.js';
import EventEmitter from 'events';

const offers = {
  "MOD2": {
    "discount": "100%",
    "condition": "mod2"
  },
  "MIN3": {
    "discount": "10%",
    "condition": "min3"
  }
};

jest.mock('events');

describe('The Basket', () => {
  it('should be able to add items to basket', () => {
    const basket = new Basket(offers, new EventEmitter());
    const product1 = { code: 'PR1', name: 'Test Product 1' };
    const product2 = { code: 'PR2', name: 'Test Product 2' };

    basket.add(product1);
    basket.add(product2);

    expect(basket.products[product1.code].length).toBe(1);
    expect(basket.products[product2.code].length).toBe(1);
  });

  it('should calculate total when no offers', () => {
    const basket = new Basket(offers, new EventEmitter());
    const product1 = { code: 'PR1', name: 'Test Product 1', price: 1 };
    const product2 = { code: 'PR2', name: 'Test Product 2', price: 2 };

    basket.add(product1);
    basket.add(product2);

    expect(basket.total()).toBe(3);
  });

  it('should calculate the correct total when item have the second one for free offer', () => {
    const basket = new Basket(offers, new EventEmitter());
    const product1 = { code: 'MOD2', name: 'Test Product 1', price: 1 };
    const product2 = { code: 'MOD2', name: 'Test Product 1', price: 1 };

    basket.add(product1);
    basket.add(product2);

    expect(basket.total()).toBe(1);
  });

  it('should calculate the correct total when item have the multi buy offer', () => {
    const basket = new Basket(offers, new EventEmitter());
    const product1 = { code: 'MIN3', name: 'Test Product 1', price: 10 };

    basket.add(product1);
    basket.add(product1);
    basket.add(product1);

    expect(basket.total()).toBe(27);
  });
});