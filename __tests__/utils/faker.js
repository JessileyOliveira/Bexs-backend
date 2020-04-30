const faker = require('faker');

function generateFakeQuestion() {
  return {
    name: faker.name.findName(),
    email: `${faker.lorem.text(25)}?`,
  };
}

module.exports = {
  generateFakeQuestion,
};
