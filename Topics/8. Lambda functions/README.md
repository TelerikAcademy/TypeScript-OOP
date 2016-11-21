<!-- section start -->
<!-- attr: { id:'title', class:'slide-title', hasScriptWrapper:true } -->  
# Lambda expressions
## Lambda expressions (arrow functions), syntax specifics and benefits

<div class="signature">
		<p class="signature-course">TypeScript OOP</p>
		<p class="signature-initiative">Telerik School Academy</p>
		<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Lambda expressions](#lambdas)
  - [also called Arrow functions](#lambdas)
- [Lambda expressions syntax](#lambdaSyntax)
- [Lambda expressions benefits](#lambdaBenefis)
- [Live demo](#lambdaDemo)




<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Lambda expressions
## also called 'Arrow functions'




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Lambda functions
**Lambda functions**, also called **Arrow functions**, are a more concise way to write **anonymous functions** that are used very often in JavaScript and TypeScript.

To clearly review the advantages of arrow functions - lets analyze the following example:

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.8em'} -->
# Lambda functions
We've got a typical anonymous function. It is passed as a parameter to the `filter()` function on an `array`.  
The body of the function contains **one simple equality comparison**, but we still have to write an entire function, which includes the `function` keyword, `opening` and `closing` curly braces, and the `return` keyword. That's a lot of extra stuff you have to read and write for only a single line of code.

```javascript
let books = allBooks.filter(function(book) {
	return book.author === 'Herman Melville';
})
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.8em'} -->
# Lambda functions
Here is the same code from the previous example, implemented using an arrow function.

```javascript
let books = allBooks.filter(book => book.author === 'Herman Melville');
```

On the left are the parameters of the function  
On the right is the body of the function

<div class="fragment balloon" style="top:24%; left:40%; width:8%">Arrow</div>




<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.8em'} -->
# Lambda functions syntax
- Arrow function with empty parameters list  

```javascript
books.forEach(() => console.log('Done reading!'));
```

- Arrow function with a single parameter  

```javascript
books.forEach(title => console.log(title));
```

- Arrow function with multiple parameters  

```javascript
books.forEach((title, ind, arr) => console.log(idx + ' - ' + title));
```

The rule is: **parenthesis are required around parameters unless you have only one parameter**.



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Lambda functions syntax
- Arrow function with multiple parameters and multi-lines body  

```javascript
books.forEach((title, ind, arr) => {
	console.log(idx + ' - ' + title);
	// line 1
	// line 2
	// return statement (if the function must return a value)
});
```

If you have a function with multi-lines body, you must use curly braces **{ }** in order to wrap the function body




<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.8em'} -->
# Lambda functions
A side benefit of using arrow functions is how they handle the often confusing `this` variable.  
Arrow functions capture the value of `this` variable at function creation - not invocation.

```javascript
function Book2() {   // the standard way
    let self = this;   // capturing the value of "this", to use it later
    self.publishDate = 2016;
    setInterval(function() {
        console.log(self.publishDate);
    }, 1000)
}
```

```javascript
function Book() {   // the arrow functions way
    this.publishDate = 2016;   // straight forward usage of "this"
    setInterval(() => console.log(this.publishDate), 1000)
}
```



<!-- section start -->
<!-- attr: {class: "slide-section"} -->
# Using lambda functions
## Live demo




<!-- section start -->
<!-- attr: {class: "slide-section"} -->
# Questions?
