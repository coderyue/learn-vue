export default {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮</button>
      <name>{{name}}</name>
    </div>
  `,
  data() {
    return {
      message: 'hello webpack',
      name: 'coderyue'
    }
  },
  methods: {
    btnClick() {

    }
  }
}