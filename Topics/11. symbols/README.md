<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Symbols
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [Well-known Symbols](#well-known-symbols)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Introduction


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- Starting with ECMAScript 2015, symbol is a primitive data type, just like number and string.
- symbol values are created by calling the Symbol constructor.

```javascript
let sym1 = Symbol();

let sym2 = Symbol("key"); // optional string key

```

- Symbols are immutable, and unique.

```javascript
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols are unique

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- Just like strings, symbols can be used as keys for object properties.

```javascript
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"

```

- Symbols can also be combined with computed property declarations to declare object properties and class members.

```javascript
const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"

```





<!-- section start -->
<!-- attr: { id:'well-known-symbols', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols
- In addition to user-defined symbols, there are well-known built-in symbols. Built-in symbols are used to represent internal language behaviors.
- Here is a list of well-known symbols:
- Here is a list of well-known symbols:
- A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols
- A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.
- A Boolean value indicating that an object should be flatten to its array elements by Array.prototype.concat.
- A Boolean value indicating that an object should be flatten to its array elements by Array.prototype.concat.
- A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
- A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
- A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols
- A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.
- A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
- A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
- A regular expression method that returns the index within a string that matches the regular expression. Called by the String.prototype.search method.
- A regular expression method that returns the index within a string that matches the regular expression. Called by the String.prototype.search method.
- A function valued property that is the constructor function that is used to create derived objects.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols
- A function valued property that is the constructor function that is used to create derived objects.
- A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.
- A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.
- A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.
- A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.
- A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Well-known Symbols
- A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.
- An Object whose own property names are property names that are excluded from the ‘with’ environment bindings of the associated objects.




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Symbols
## Questions




