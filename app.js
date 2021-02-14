class ElementBuilder {
  constructor(name) {
    this.element = document.createElement(name);
  }

  id(id) {
    this.element.id = id;
    return this;
  }

  forId(id) {
    this.element.for = id;
    return this;
  }

  value(value) {
    this.element.value = value;
    return this;
  }

  type(type) {
    this.element.type = type;
    return this;
  }

  text(text) {
    this.element.textContent = text;
    return this;
  }

  html(htmlValue) {
    this.element.innerHTML = htmlValue;
    return this;
  }

  getText() {
    return this.element.textContent;
  }

  src(src) {
    this.element.src = src;
    return this;
  }

  className(name) {
    this.element.className = name;
    return this;
  }

  onSubmit(fn) {
    this.element.onsubmit = fn;
    return this;
  }

  onClick(fn) {
    this.element.onclick = fn;
    return this;
  }

  appendTo(parent) {
    if (parent instanceof ElementBuilder) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    return this;
  }
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name);
  }
};

class Painter {
  root;
  count;
  apiData;
  constructor(root, data) {
    this.root = root;
    this.count = 0;
    this.apiData = data;
  }

  element(thumbnailUrl, title) {
    const element = builder.create('div').className('element');
    const image = builder.create('div').className('image').appendTo(element);
    builder.create('img').src(thumbnailUrl).appendTo(image);
    builder.create('div').className('title').text(title).appendTo(element);
    return element;
  }

  formSubmit(e) {
    e.preventDefault();
    this.count = +e.target[0].value;
    this.render();
  }

  input() {
    const input = builder
      .create('form')
      .className('input')
      .onSubmit((e) => this.formSubmit(e));
    builder.create('input').type('text').appendTo(input);
    builder.create('button').type('submit').text('Load').appendTo(input);
    return input;
  }

  render() {
    this.root.innerHTML = '';
    const container = builder
      .create('div')
      .className('container')
      .appendTo(this.root);
    this.input().appendTo(container);
    const data = builder.create('div').className('data').appendTo(container);
    const countData = this.apiData.slice(0, this.count);
    countData.forEach((item) => {
      this.element(item.thumbnailUrl, item.title).appendTo(data);
    });
  }
}

fetch('https://jsonplaceholder.typicode.com/photos')
  .then((response) => response.json())
  .then((data) => {
    const app = new Painter(document.getElementById('root'), data);
    app.render();
  });
