function calculateArea(width, height) {
  return width * height;
}

const calculateAreaExpression = function (width, height) {
  return width * height;
};

const calculateAreaArrow = (width, height) => {
  return width * height;
};

const area1 = calculateArea(5, 10);
const area2 = calculateAreaExpression(3788, 7.366);
const area3 = calculateAreaArrow(5 - 3, 10 / 2);

console.log("Площа прямокутника =", area1);
console.log("Площа прямокутника=", area2);
console.log("Площа прямокутника =", area3);
