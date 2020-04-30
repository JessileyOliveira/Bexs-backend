const faker = require('faker');

function generateFakeQuestion() {
  return {
    user: faker.name.findName(),
    text: `${faker.lorem.text(25)}?`,
  };
}

module.exports = {
  generateFakeQuestion,
};
