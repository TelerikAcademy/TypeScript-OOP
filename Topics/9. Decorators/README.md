<!-- section start -->
<!-- attr: { id:'title', class:'slide-title', hasScriptWrapper:true } -->  
# Decorators
## Definition, Syntax and factory functions, Types of decorators

<div class="signature">
		<p class="signature-course">TypeScript OOP</p>
		<p class="signature-initiative">Telerik School Academy</p>
		<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [What are decorators](#decorators)
- [Types of decorators](#decoratorsSyntax)
  - [Class decorators](#classDecorators)
	- [Method decorators](#methodDecorators)
	- [Property decorators](#propertyDecorators)
	- [Parameter decorators](#propertyDecorators)
- [Creating and using decorators](#usingDecorators)



<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# What are decorators in TypeScript?



<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em;' } -->
# Decorators
- Decorators are `proposed feature` for a future version of JavaScript.
- TypeScript makes us live in the future by using new features, which are not part of the standard yet.
- They are form of **declarative programming**, which means once you create a decorator, you can **apply it** to classes methods and other things affectively **describing what these things should do, rather than how they should do them**.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Decorators
- Decorators are implemented as **functions**.
- They can be attached to **classes, methods, properties, parameters**.
- To use the decorators feature, it is required to use the **experimentalDecorators compiler option**, when compiling the `'.ts'` files.



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Types of decorators



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Class decorators



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Class decorators
- Class decorators are applied for classes.
- A classs decorator is declared just before a class declaration.
- The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Class decorators
- The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument.
- If the class decorator returns a value, it will replace the class declaration with the provided constructor function.



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Class decorators
- Example:

```typescript
// Class decorator definition
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  // class definition
}
```


<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Method decorators



<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em;' } -->
# Method decorators
- A method decorator is declared just before a method declaration. The decorator is applied to the property descriptor for the method, and can be used to observe, modify, or replace a method definition.

- The expression for the method decorator will be called as a function at runtime, with the following **three arguments**:
  - **Constructor function** of the class or the **prototype of the class** for an instance member.
  - The **name of the member**.
  - The **property descriptor** for the member.



<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em;' } -->
# Method decorators
- Example

```typescript
// Method decorator definition
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
	  // other class members

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Property decorators
- The same concept as the other decorators.
- [Property decorators](#https://www.typescriptlang.org/docs/handbook/decorators.html)




<!-- section start -->
<!-- attr: {class: "slide-section"} -->
# Questions?
