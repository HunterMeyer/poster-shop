var PER_PAGE = 4;
var watcher;

new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [],
    cart: [],
    search: "cat",
    lastSearch: "",
    loading: false,
    results: []
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
      this.loading = true;
      this.products = [];
      this.results = [];
      var path = "/search?q=".concat(this.search);
      this.$http
        .get(path)
        .then(function(response) {
          this.lastSearch = this.search;
          this.results = response.body;
          this.appendResults();
          this.loading = false;
        });
    },
    appendResults: function() {
      if (this.products.length < this.results.length) {
        var toAppend = this.results.slice(
          this.products.length,
          PER_PAGE + this.products.length
        );
        this.products = this.products.concat(toAppend);
      }
    }
  },
  filters: {
    currency: function(price) {
      return "$".concat(price.toFixed(2));
    }
  },
  created: function() {
    this.onSubmit();
  },
  updated: function() {
    var sensor = document.getElementById("product-list-bottom");
    watcher = scrollMonitor.create(sensor);
    watcher.enterViewport(this.appendResults);
  },
  beforeUpdate: function() {
    if (watcher) {
      watcher.destroy();
      watcher = null;
    }
  }
});
