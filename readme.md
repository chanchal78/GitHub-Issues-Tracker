\*\*\*

1. Difference between var, let and const:
   var:

1. hoisted and initialized
1. lets us redeclare a variable
1. can reassign a value
1. var maintains only function scope and doesn't follow global/block scope

let:

1.  hoisted but not initialized
2.  can't redeclare
3.  can reassign a value
4.  let maintains all the scopes

const:

1.  hoisted but not initialized
2.  can't redeclare
3.  can't reassign a value
4.  const maintains all the scopes

---

\*\*\* 2. Spread operator:

- Spread operator is a feature that is used to take all of the items from a list, array or object and spread them individually, so we can use them somewhere else where needed. a spread operator is written with three dots (...)

---

\*\*\* 3. Difference between map(), filter(), forEach():

- forEach method is used to access the items in an array, so we can do something we need with them. To run functions with for the each items.
- filter method is used to filter items that is matched with a condition. It returns a list/array of the filtered items that matched the condition.
- map method can transform the items in an array to create a new array. like:
  arr = [1, 3, 5, 6,]
  let square = arr.map(num => num\*num);

the output will be: [1, 9, 25, 36];

---

\*\*\* 4. Arrow function:

- Arrow function is a function but we can write it in a short way than the traditional function.

---

\*\*\* 5. Template literals:

- Template literals is also a easier way to write a string even if we want to write it in multiple lines, like codes/expressions. to write template literals we use backticks(` `) instead of quotes.
