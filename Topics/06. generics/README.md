<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Generics
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [Hello World of Generics](#hello-world-of-generics)
- [Working with Generic Type Variables](#working-with-generic-type-variables)
- [Generic Types](#generic-types)
- [Generic Classes](#generic-classes)
- [Generic Constraints](#generic-constraints)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Introduction


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- A major part of software engineering is building components that not only have well-defined and consistent APIs, but are also reusable. Components that are capable of working on the data of today as well as the data of tomorrow will give you the most flexible capabilities for building up large software systems.
- In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.




<!-- section start -->
<!-- attr: { id:'hello-world-of-generics', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics
- To start off, let’s do the “hello world” of generics: the identity function. The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the echo command.
- Without generics, we would either have to give the identity function a specific type:

```javascript
function identity(arg: number): number {
    return arg;
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics
- Or, we could describe the identity function using the any type:

```javascript
function identity(arg: any): any {
    return arg;
}

```

- While using any is certainly generic in that will accept any and all types for the type of arg, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics
- Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. Here, we will use a type variable, a special kind of variable that works on types rather than values.

```javascript
function identity&lt;T&gt;(arg: T): T {
    return arg;
}

```

- We’ve now added a type variable T to the identity function. This T allows us to capture the type the user provides (e.g. number), so that we can use that information later. Here, we use T again as the return type. On inspection, we can now see the same type is used for the argument and the return type. This allows us to traffic that type information in one side of the function and out the other.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics
- We say that this version of the identity function is generic, as it works over a range of types. Unlike using any, it’s also just as precise (ie, it doesn’t lose any information) as the first identity function that used numbers for the argument and return type.
- Once we’ve written the generic identity function, we can call it in one of two ways. The first way is to pass all of the arguments, including the type argument, to the function:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics

```javascript
let output = identity&lt;string&gt;("myString");  // type of output will be 'string'

```

- Here we explicitly set T to be string as one of the arguments to the function call, denoted using the &lt;&gt; around the arguments rather than ().
- The second way is also perhaps the most common. Here we use type argument inference, that is, we want the compiler to set the value of T for us automatically based on the type of the argument we pass in:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Hello World of Generics

```javascript
let output = identity("myString");  // type of output will be 'string'

```

- Notice that we didn’t have to explicitly pass the type in the angle brackets (&lt;&gt;), the compiler just looked at the value "myString", and set T to its type. While type argument inference can be a helpful tool to keep code shorter and more readable, you may need to explicitly pass in the type arguments as we did in the previous example when the compiler fails to infer the type, as may happen in more complex examples.




<!-- section start -->
<!-- attr: { id:'working-with-generic-type-variables', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables
- When you begin to use generics, you’ll notice that when you create generic functions like identity, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. That is, that you actually treat these parameters as if they could be any and all types.
- Let’s take our identity function from earlier:

```javascript
function identity&lt;T&gt;(arg: T): T {
    return arg;
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables
- What if we want to also log the length of the argument arg to the console with each call? We might be tempted to write this:

```javascript
function loggingIdentity&lt;T&gt;(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

```

- When we do, the compiler will give us an error that we’re using the .length member of arg, but nowhere have we said that arg has this member. Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables
- Let’s say that we’ve actually intended this function to work on arrays of T rather than T directly. Since we’re working with arrays, the .length member should be available. We can describe this just like we would create arrays of other types:

```javascript
function loggingIdentity&lt;T&gt;(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables
- You can read the type of loggingIdentity as “the generic function loggingIdentity takes a type parameter T, and an argument arg which is an array of Ts, and returns an array of Ts.” If we passed in an array of numbers, we’d get an array of numbers back out, as T would bind to number. This allows us to use our generic type variable T as part of the types we’re working with, rather than the whole type, giving us greater flexibility.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Generic Type Variables
- We can alternatively write the sample example this way:

```javascript
function loggingIdentity&lt;T&gt;(arg: Array&lt;T&gt;): Array&lt;T&gt; {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

```

- You may already be familiar with this style of type from other languages. In the next section, we’ll cover how you can create your own generic types like Array&lt;T&gt;.




<!-- section start -->
<!-- attr: { id:'generic-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types
- In previous sections, we created generic identity functions that worked over a range of types. In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.
- The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:

```javascript
function identity&lt;T&gt;(arg: T): T {
    return arg;
}

let myIdentity: &lt;T&gt;(arg: T) =&gt; T = identity;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types
- We could also have used a different name for the generic type parameter in the type, so long as the number of type variables and how the type variables are used line up.

```javascript
function identity&lt;T&gt;(arg: T): T {
    return arg;
}

let myIdentity: &lt;U&gt;(arg: U) =&gt; U = identity;

```

- We can also write the generic type as a call signature of an object literal type:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types

```javascript
function identity&lt;T&gt;(arg: T): T {
    return arg;
}

let myIdentity: {&lt;T&gt;(arg: T): T} = identity;

```

- Which leads us to writing our first generic interface. Let’s take the object literal from the previous example and move it to an interface:

```javascript
interface GenericIdentityFn {
    &lt;T&gt;(arg: T): T;
}

function identity&lt;T&gt;(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types
- In a similar example, we may want to move the generic parameter to be a parameter of the whole interface. This lets us see what type(s) we’re generic over (e.g. Dictionary&lt;string&gt; rather than just Dictionary). This makes the type parameter visible to all the other members of the interface.

```javascript
interface GenericIdentityFn&lt;T&gt; {
    (arg: T): T;
}

function identity&lt;T&gt;(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn&lt;number&gt; = identity;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types
- Notice that our example has changed to be something slightly different. Instead of describing a generic function, we now have a non-generic function signature that is a part of a generic type. When we use GenericIdentityFn, we now will also need to specify the corresponding type argument (here: number), effectively locking in what the underlying call signature will use. Understanding when to put the type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Types
- In addition to generic interfaces, we can also create generic classes. Note that it is not possible to create generic enums and namespaces.




<!-- section start -->
<!-- attr: { id:'generic-classes', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Generic Classes


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Classes
- A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets (&lt;&gt;) following the name of the class.

```javascript
class GenericNumber&lt;T&gt; {
    zeroValue: T;
    add: (x: T, y: T) =&gt; T;
}

let myGenericNumber = new GenericNumber&lt;number&gt;();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Classes
- This is a pretty literal use of the GenericNumber class, but you may have noticed that nothing is restricting it to only use the number type. We could have instead used string or even more complex objects.

```javascript
let stringNumeric = new GenericNumber&lt;string&gt;();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

alert(stringNumeric.add(stringNumeric.zeroValue, "test"));

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Classes
- Just as with interface, putting the type parameter on the class itself lets us make sure all of the properties of the class are working with the same type.
- As we covered in our section on classes, a class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.




<!-- section start -->
<!-- attr: { id:'generic-constraints', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints
- If you remember from an earlier example, you may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have. In our loggingIdentity example, we wanted to be able access the .length property of arg, but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints

```javascript
function loggingIdentity&lt;T&gt;(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

```

- Instead of working with any and all types, we’d like to constrain this function to work with any and all types that also have the .length property. As long as the type has this member, we’ll allow it, but it’s required to have at least this member. To do so, we must list our requirement as a constraint on what T can be.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints
- To do so, we’ll create an interface that describes our constraint. Here, we’ll create an interface that has a single .length property and then we’ll use this interface and the extends keyword to denote our constraint:

```javascript
interface Lengthwise {
    length: number;
}

function loggingIdentity&lt;T extends Lengthwise&gt;(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints
- Because the generic function is now constrained, it will no longer work over any and all types:

```javascript
loggingIdentity(3);  // Error, number doesn't have a .length property

```

- Instead, we need to pass in values whose type has all the required properties:

```javascript
loggingIdentity({length: 10, value: 3});

```


```javascript
loggingIdentity({length: 10, value: 3});

```

- You can declare a type parameter that is constrained by another type parameter. For example, here we’d like to take two objects and copy properties from one to the other. We’d like to ensure that we’re not accidentally writing any extra properties from our source, so we’ll place a constraint between the two types:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints

```javascript
function copyFields&lt;T extends U, U&gt;(target: T, source: U): T {
    for (let id in source) {
        target[id] = source[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 }); // okay
copyFields(x, { Q: 90 });  // error: property 'Q' isn't declared in 'x'.

```


```javascript
function copyFields&lt;T extends U, U&gt;(target: T, source: U): T {
    for (let id in source) {
        target[id] = source[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 }); // okay
copyFields(x, { Q: 90 });  // error: property 'Q' isn't declared in 'x'.

```

- When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example,


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generic Constraints

```javascript
function create&lt;T&gt;(c: {new(): T; }): T {
    return new c();
}

```

- A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types.

```javascript
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function findKeeper&lt;A extends Animal, K&gt; (a: {new(): A;
    prototype: {keeper: K}}): K {

    return a.prototype.keeper;
}

findKeeper(Lion).nametag;  // typechecks!

```





<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Generics
## Questions




