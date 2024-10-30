// const a = "bad credit";
// const b = "debit card";

// const checkAnagram = (a, b) => {
//   const x =
//     a.split("").sort().join().replace(/ /g, " ") ===
//     b.split("").sort().join().replace(/ /g, " ")
//       ? true
//       : false;
//   console.log(x);
//   return x;
// };
// checkAnagram(a, b);

// let a = 2;

// for (let i = 1; i <= 10; i++) {
//   const x = a * i;
//   console.log(`2x1=${x}`);
// }

// let a = 1;
// function num() {
//   for (let i = 1; i <= 100; i++) {
//     const x = a * i;
//     console.log(x);
//     // return x;
//   }
// }
// console.log(num());

function myFunction() {
  for (let i = 0; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else console.log(i);
  }
}
myFunction();

let string = "hello";
function reverseString(str) {
  console.log(str.split("").reverse().join(""));
}
// reverseString(string);

function coutEven() {
  for (let i = 0; i < 10; i++) {
    i % 2 === 0 ? console.log(i) : null;
  }
}
coutEven();
