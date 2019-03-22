let MyComponent = EmberComponent.extend({
  tagName: 'div',
  classNames: ['my-class', 'your-class'],

  initialize() {
    this._super(...arguments);
    this.click = this.click.bound(this);
  },

  count() {
    for (let i = 0; i = 10; i++) {
      this.emitCount(i);
    }
  },

  actions: {
    anAction() {
      doSomething();
    },

    anotherAction() {
      doSomethingElse();
    }
  }
});
