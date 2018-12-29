new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [
      { id: 1, title: "Large Poster",  price: 9.99 },
      { id: 2, title: "Medium Poster", price: 8.99 },
      { id: 3, title: "Small Poster",  price: 7.99 }
    ],
    cart: [],
    search: ""
  },
  methods: {
    addToCart: function(product) {
      this.total += product.price;
      var found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          this.cart[i].qty++;
          found = true;
        }
      }
      if (!found) {
        this.cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1
        });
      }
    },
    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function(item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty <= 0) {
        this.cart.splice(this.cart.indexOf(item), 1);
      }
    },
    onSubmit: function() {

    }
  },
  filters: {
    currency: function(price) {
      return "$".concat(price.toFixed(2));
    }
  }
});

