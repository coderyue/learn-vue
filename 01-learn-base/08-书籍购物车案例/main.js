const app = new Vue({
  el: '#app',
  data: {
    books: [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-03',
        price: 128.00,
        count: 1
      }
    ]
  },
  methods: {
    // getPrice(price) {
    //   return '¥' + price.toFixed(2);
    // }
    decrement(index) {
      this.books[index].count --;
    },
    increment(index) {
      this.books[index].count ++;
    },
    removeHanlder(index) {
      this.books.splice(index, 1);
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      // 1.普通for循环
      // for (let i = 0; i < this.books.length; i++) {
      //   totalPrice += this.books[i].price * this.books[i].count;
      // }
      // return totalPrice;

      // 2. for (let i in this.books)
      // for (let i of this.books) {
      //   totalPrice += this.books[i].price * this.books[i].count;
      // }

      // 3. for (let book of this.books)
      // for (let book of this.books) {
      //   totalPrice += book.price * book.count
      // }

      return this.books.reduce((pre, book) => pre + book.price * book.count, 0);

      // 4. reduce
      // const nums = [12,1,23,21,4,23,4235,2342];
      // 有几个高阶函数，filter， map， reduce      (和Java类似的)
      // 1. filter
      // let newNums = nums.filter(function (n) {
      //   return n < 100;
      // })
      // console.log(newNums);
      // // 2. map
      // let new2Nums = newNums.map(function (n) {
      //   return n * 2;
      // })
      // console.log(new2Nums);
      // // 3. reduce
      // let total = new2Nums.reduce(function (preValue, n) {
      //   return preValue + n;
      // }, 0)
      // console.log(total)

      // let total = nums.filter(n => n < 100).map(n => n * 2).reduce((pre, n) => pre + n, 0)
      // let total = nums.filter(n => n < 100).map(n => n * 2).reduce((pre, n) => pre + n); // 没有最后面的0不报错
      // console.log(total);
      //
      // return 200;  // 不先返回一个值会报错
    }
  },
  filters: {
    showPrice(price) {
      return '¥' + price.toFixed(2);
    }
  }



})