const startingYear = 2014;
const startingMonth = 7;

const magicNumbers = {
  rent: {
    count: 1,
    min: 1200,
    max: 1200,
  },
  utilities: {
    count: 3,
    min: 50,
    max: 100,
  },
  groceries: {
    count: 10,
    min: 5,
    max: 100,
  },
  stuff: {
    count: 2,
    min: 50,
    max: 300,
  },
  unexpected: {
    count: 1,
    min: 5,
    max: 1200,
  },
  income: {
    count: 2,
    min: 1000,
    max: 1500,
  },
};

const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const randTimestamp = (month, year) => {
  const day = randInt(1, 28);
  return Math.floor((new Date(year, month, day)).getTime() / 1000);
};

const ucFirst = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

module.exports = async () => {
  const currentYear = (new Date()).getFullYear();
  const currentMonth = ((new Date()).getMonth() + 1);

  const data = [];
  for (
    let year = startingYear;
    year <= currentYear;
    year += 1
  ) {
    for (
      let month = (year === startingYear ? startingMonth : 1);
      month <= (year === currentYear ? currentMonth : 12);
      month += 1
    ) {
      Object.keys(magicNumbers).forEach((category) => {
        const nums = magicNumbers[category];
        for (let i = 0; i < nums.count; i += 1) {
          data.push({
            month,
            year,
            date: randTimestamp(month, year),
            type: (category === 'income') ? 1 : -1,
            category,
            title: `${ucFirst(category)} title # ${(i + 1)}`,
            sum: (category === 'unexpected')
              ? randInt(0, 1) * randInt(nums.min, nums.max)
              : randInt(nums.min, nums.max),
          });
        }
      });
    }
  }
  return data;
};
