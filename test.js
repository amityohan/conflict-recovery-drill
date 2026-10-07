const assert = require('node:assert/strict');
const checkout = require('./checkout');

const cases = [
    {
        name: 'single item discount and tax',
        items: [{ name: 'apple', price: 10.00 }],
        expected: 9.45
    },
    {
        name: 'multiple items with final rounding',
        items: [
            { name: 'apple', price: 2.99 },
            { name: 'banana', price: 4.99 }
        ],
        expected: 7.54
    }
];

for (const testCase of cases) {
    assert.equal(checkout(testCase.items), testCase.expected, testCase.name);
    console.log(`SUCCESS: ${testCase.name}`);
}
