export default class Basket {
  constructor(offers, eventEmitter) {
    this.ee = eventEmitter;
    this.offers = offers || {};
    this.products = {};
  }

  add(item) {
    this.products = {
      ...this.products,
      [item.code]: [
        item,
        ...(this.products[item.code] || [])
      ]
    };
    this.ee.emit('product_added', item);
  }

  total() {
    this.applyOffers();

    return this.getTotalWithDiscounts();
  }

  getTotalWithDiscounts() {
    return Object.keys(this.products).reduce((acc, cat) => {
      return this.products[cat].reduce((total, p) => total + p.finalPrice, acc);
    }, 0);
  }

  applyOffers() {
    Object.keys(this.products).map(cat => {
      this.products[cat] = this.applyOffer(this.products[cat])
    });
  }

  applyOffer(products) {
    return products.map((prod, idx) => {
      return {
        ...prod,
        finalPrice: this.getFinalPrice(idx, prod)
      }
    });
  }

  getFinalPrice(idx, prod) {
    const offer = this.offers[prod.code];
    if (offer && this.meetsCondition(offer.condition, idx, prod)) {
      return this.getDiscountedPrice(prod.price, offer.discount);
    }

    return prod.price;
  }

  meetsCondition(condition, idx, prod) {
    if (condition.includes('mod')) {
      return this.isModX(condition, idx);
    }

    if (condition.includes('min')) {
      return this.isMinX(condition, prod);
    }

    return false;
  }

  isMinX(condition, prod) {
    const ofSameTypeNr = this.products[prod.code].length;
    return ofSameTypeNr >= parseInt(condition.replace('min', ''));
  }

  isModX(condition, idx) {
    return (idx + 1) % parseInt(condition.replace('mod', '')) === 0;
  }

  getDiscountedPrice(price, discount) {
    return price - price * parseInt(discount) / 100;
  }
}