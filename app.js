const express = require("express");
const morgan = require("morgan");
const app = express();

//this is middleware that requests pass through on their way to the final handler
app.use(morgan("dev"));

//this is the final request handler
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

//DRILL 1
app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const c = a + b;
  const result = `The sum of ${a} and ${b} is ${c}.`;
  res.send(result);
});

//DRILL 2
app.get("/cipher", (req, res) => {
  const text = req.query.text.toUpperCase();
  const arrayText = Array.from(text);
  const shift = parseInt(req.query.shift);
  const base = "A".charCodeAt(0);
  let shiftedArray = [];
  for (let i = 0; i < arrayText.length; i++) {
    let value = arrayText[i].charCodeAt(0);
    if (value < base || value > base + 26) {
      return value;
    }
    let diff = value - base;
    diff = diff + shift;
    diff = diff % 26;
    console.log(value);
    let shiftedLetter = String.fromCharCode(base + diff);
    shiftedArray.push(shiftedLetter);
  }
  const arrayToString = shiftedArray.join("");
  const finalString = arrayToString.toLowerCase();
  const result = `The final result is ${finalString}`;
  res.send(result);
});

//DRILL 3
app.get("/lotto", (req, res) => {
  const randomArray = [];
  for (let i = 0; i < 20; i++) {
    randomArray.push(Math.floor(Math.random() * (20 - 1) + 1));
  }
  const arrayString = req.query.arr;
  let arrayNumber = [];
  for (let i = 0; i < arrayString.length; i++) {
    const number = parseInt(arrayString[i]);
    if (number > 20 || number < 1) {
      console.log("Number should be between 1 and 20.");
    } else arrayNumber.push(number);
  }
  let score = arrayNumber.filter((f) => !randomArray.includes(f));
  if (score.length < 4) {
    result = `You lose`;
  }
  if (score.length === 4) {
    result = `Congratulations, you win a free ticket!`;
  }
  if (score.length === 5) {
    result = `Congratulations, you win $100!`;
  }
  if (score.length === 6) {
    result = `Wow! You could have won the mega millions!`;
  }
  res.send(result);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
