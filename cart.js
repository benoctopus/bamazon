class ShoppingCart {
  constructor() {
    this.cart = {};
  }

  append(item, quantity) {
    if (!Object.keys(this.cart).includes(item.id)) {
      this.cart[item.id] = {item, quantity};
    }
    else {
      this.cart[item.id].quantity = quantity;
    }
    this.cart[item.id].total = item.price * quantity;
  }

  finalTotal() {
    let total = 0;
    Object.values(this.cart).forEach(obj => {
      total += (obj.item.price * obj.quantity)
    });
    return '$' + total.toString();
  }

  readableExport() {
    return (
      Object.values(this.cart).map(
        obj => {
          return {
            name: obj.item.name,
            unit_price: '$' + obj.item.price.toString(),
            quantity: obj.quantity,
            total: '$' + obj.total.toString()
          }
        }
      )
    )
  }

  clear() {
    this.cart = {}
  }
}

module.exports = () => new ShoppingCart();