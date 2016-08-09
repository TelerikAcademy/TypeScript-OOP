<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Iterators and Generators
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Iterables](#iterables)






<!-- section start -->
<!-- attr: { id:'iterables', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Iterables


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Iterables
- An object is deemed iterable if it has an implementation for the Symbol.iterator property. Some built-in types like Array, Map, Set, String, Int32Array, Uint32Array, etc. have their Symbol.iterator property already implemented. Symbol.iterator function on an object is responsible for returning the list of values to iterate on.
- An object is deemed iterable if it has an implementation for the Symbol.iterator property. Some built-in types like Array, Map, Set, String, Int32Array, Uint32Array, etc. have their Symbol.iterator property already implemented. Symbol.iterator function on an object is responsible for returning the list of values to iterate on.
- for..of loops over an iterable object, invoking the Symbol.iterator property on the object. Here is a simple for..of loop on an array:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Iterables

```javascript
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

```


```javascript
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

```

- Both for..of and for..in statements iterate over lists; the values iterated on are different though, for..in returns a list of keys on the object being iterated, whereas for..of returns a list of values of the numeric properties of the object being iterated.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Iterables
- Here is an example that demonstrates this distinction:

```javascript
let list = [4, 5, 6];

for (let i in list) {
   console.log(i); // "0", "1", "2",
}

for (let i of list) {
   console.log(i); // "4", "5", "6"
}

```

- Another distinction is that for..in operates on any object; it serves as a way to inspect properties on this object. for..of on the other hand, is mainly interested in values of iterable objects. Built-in objects like Map and Set implement Symbol.iterator property allowing access to stored values.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Iterables

```javascript
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

```


```javascript
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

```


```javascript
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

```

- When targeting an ES5 or ES3, iterators are only allowed on values of Array type. It is an error to use for..of loops on non-Array values, even if these non-Array values implement the Symbol.iterator property.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Iterables
- The compiler will generate a simple for loop for a for..of loop, for instance:

```javascript
let numbers = [1, 2, 3];
for (let num of numbers) {
    console.log(num);
}

```

- will be generated as:

```javascript
var numbers = [1, 2, 3];
for (var _i = 0; _i &lt; numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}

```


```javascript
var numbers = [1, 2, 3];
for (var _i = 0; _i &lt; numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}

```

- When targeting an ECMAScipt 2015-compliant engine, the compiler will generate for..of loops to target the built-in iterator implementation in the engine.




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Iterators and Generators
## Questions




