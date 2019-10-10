class Veek {
  constructor() {
    this.name = 'Veek',
    this.weight = 'massive',
    this.fat = true
  }
}

let myVeek = new Veek();

let veekArr = [];

veekArr[12] = myVeek;

veekArr[3] = 12;

veekArr[2] = 'hello';

for(let i of veekArr) {
  console.log(`${i} ${JSON.stringify(veekArr[i])}`);
}

for (let i = 0; i < veekArr.length; i++) {
  console.log(`${i}: ${veekArr[i]}`);
}

