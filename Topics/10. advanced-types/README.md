<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Advanced Types
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Union Types](#union-types)
- [Type Guards and Differentiating Types](#type-guards-and-differentiating-types)
- [Intersection Types](#intersection-types)
- [Type Aliases](#type-aliases)
- [String Literal Types](#string-literal-types)
- [Polymorphic this types](#polymorphic-this-types)






<!-- section start -->
<!-- attr: { id:'union-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Union Types -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Union Types
- Occasionally, you’ll run into a library that expects a parameter to be either a number or a string. For instance, take the following function:

```javascript
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Union Types
- The problem with padLeft is that its padding parameter is typed as any. That means that we can call it with an argument that’s neither a number nor a string, but TypeScript will be okay with it.

```javascript
let indentedString = padLeft("Hello world", true); // passes at compile time, fails at runtime.

```

- In traditional object-oriented code, we might abstract over the two types by creating a hierarchy of types. While this is much more explicit, it’s also a little bit overkill. One of the nice things about the original version of padLeft was that we were able to just pass in primitives. That meant that usage was simple and not overly verbose. This new approach also wouldn’t help if we were just trying to use a function that already exists elsewhere.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Union Types
- Instead of any, we can use a union type for the padding parameter:

```javascript
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Union Types
- A union type describes a value that can be one of several types. We use the vertical bar (|) to separate each type, so number | string | boolean is the type of a value that can be a number, a string, or a boolean.
- If we have a value that has a union type, we can only access members that are common to all types in the union.

```javascript
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Union Types
- Union types can be a bit tricky here, but it just takes a bit of intuition to get used to. If a value has the type A | B, we only know for certain that it has members that both A and B have. In this example, Bird has a member named fly. We can’t be sure whether a variable typed as Bird | Fish has a fly method. If the variable is really a Fish at runtime, then calling pet.fly() will fail.




<!-- section start -->
<!-- attr: { id:'type-guards-and-differentiating-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Type Guards and Differentiating Types -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types
- Union types are useful for modeling situations when values can overlap in the types they can take on. What happens when we need to know specifically whether we have a Fish? A common idiom in JavaScript to differentiate between two possible values is to check for the presence of a member. As we mentioned, you can only access members that are guaranteed to be in all the constituents of a union type.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types

```javascript
let pet = getSmallPet();

// Each of these property accesses will cause an error
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}

```

- To get the same code working, we’ll need to use a type assertion:

```javascript
let pet = getSmallPet();

if ((&lt;Fish&gt;pet).swim) {
    (&lt;Fish&gt;pet).swim();
}
else {
    (&lt;Bird&gt;pet).fly();
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types

```javascript
let pet = getSmallPet();

if ((&lt;Fish&gt;pet).swim) {
    (&lt;Fish&gt;pet).swim();
}
else {
    (&lt;Bird&gt;pet).fly();
}

```

- Notice that we had to use type assertions several times. It would be much better if once we performed the check, we could know the type of pet within each branch.
- It just so happens that TypeScript has something called a type guard. A type guard is some expression that performs a runtime check that guarantees the type in some scope. To define a type guard, we simply need to define a function whose return type is a type predicate:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types

```javascript
function isFish(pet: Fish | Bird): pet is Fish {
    return (&lt;Fish&gt;pet).swim !== undefined;
}

```

- pet is Fish is our type predicate in this example. A predicate takes the form parameterName is Type, where parameterName must be the name of a parameter from the current function signature.
- Any time isFish is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types

```javascript
// Both calls to 'swim' and 'fly' are now okay.

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}

```

- Notice that TypeScript not only knows that pet is a Fish in the if branch; it also knows that in the else branch, you don’t have a Fish, so you must have a Bird.
- Notice that TypeScript not only knows that pet is a Fish in the if branch; it also knows that in the else branch, you don’t have a Fish, so you must have a Bird.
- We didn’t actually discuss the implementation of the version of padLeft which used union types. We could write it with type predicates as follows:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types

```javascript
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types
- However, having to define a function to figure out if a type is a primitive is kind of a pain. Luckily, you don’t need to abstract typeof x === "number" into its own function because TypeScript will recognize it as a type guard on its own. That means we could just write these checks inline.

```javascript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types
- These typeof type guards are recognized in two different forms: typeof v === "typename" and typeof v !== "typename", where "typename" must be "number", "string", "boolean", or "symbol". While TypeScript won’t prohibit comparing to other strings, or switching the two sides of the comparison, the language won’t recognize those forms as type guards.
- These typeof type guards are recognized in two different forms: typeof v === "typename" and typeof v !== "typename", where "typename" must be "number", "string", "boolean", or "symbol". While TypeScript won’t prohibit comparing to other strings, or switching the two sides of the comparison, the language won’t recognize those forms as type guards.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types
- If you’ve read about typeof type guards and are familiar with the instanceof operator in JavaScript, you probably have some idea of what this section is about.
- instanceof type guards are a way of narrowing types using their constructor function. For instance, let’s borrow our industrial string-padder example from earlier:

```javascript
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() &lt; 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Guards and Differentiating Types
- The right side of the instanceof needs to be a constructor function, and TypeScript will narrow down to:
- The right side of the instanceof needs to be a constructor function, and TypeScript will narrow down to:
- in that order.




<!-- section start -->
<!-- attr: { id:'intersection-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Intersection Types -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Intersection Types
- Intersection types are closely related to union types, but they are used very differently. An intersection type, Person &amp; Serializable &amp; Loggable, for example, is a Person and Serializable and Loggable. That means an object of this type will have all members of all three types. In practice you will mostly see intersection types used for mixins. Here’s a simple mixin example:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Intersection Types

```javascript
function extend&lt;T, U&gt;(first: T, second: U): T &amp; U {
    let result = &lt;T &amp; U&gt;{};
    for (let id in first) {
        (&lt;any&gt;result)[id] = (&lt;any&gt;first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (&lt;any&gt;result)[id] = (&lt;any&gt;second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

```





<!-- section start -->
<!-- attr: { id:'type-aliases', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Type Aliases -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Aliases
- Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.

```javascript
type Name = string;
type NameResolver = () =&gt; string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Aliases
- Aliasing doesn’t actually create a new type - it creates a new name to refer to that type. Aliasing a primitive is not terribly useful, though it can be used as a form of documentation.
- Just like interfaces, type aliases can also be generic - we can just add type parameters and use them on the right side of the alias declaration:

```javascript
type Container&lt;T&gt; = { value: T };

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Aliases
- We can also have a type alias refer to itself in a property:

```javascript
type Tree&lt;T&gt; = {
    value: T;
    left: Tree&lt;T&gt;;
    right: Tree&lt;T&gt;;
}

```

- Together with intersection types, we can make some pretty mind-bending types:

```javascript
type LinkedList&lt;T&gt; = T &amp; { next: LinkedList&lt;T&gt; };

interface Person {
    name: string;
}

var people: LinkedList&lt;Person&gt;;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Aliases
- However, it’s not possible for a type alias to appear anywhere else on the right side of the declaration:

```javascript
type Yikes = Array&lt;Yikes&gt;; // error

```


```javascript
type Yikes = Array&lt;Yikes&gt;; // error

```

- As we mentioned, type aliases can act sort of like interfaces; however, there are some subtle differences.
- One important difference is that type aliases cannot be extended or implemented from (nor can they extend/implement other types). Because an ideal property of software is being open to extension, you should always use an interface over a type alias if possible.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Aliases
- On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.




<!-- section start -->
<!-- attr: { id:'string-literal-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # String Literal Types -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# String Literal Types
- String literal types allow you to specify the exact value a string must have. In practice string literal types combine nicely with union types, type guards, and type aliases. You can use these features together to get enum-like behavior with strings.

```javascript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# String Literal Types
- You can pass any of the three allowed strings, but any other string will give the error

```javascript
Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'

```

- String literal types can be used in the same way to distinguish overloads:

```javascript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}

```





<!-- section start -->
<!-- attr: { id:'polymorphic-this-types', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Polymorphic this types -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Polymorphic this types
- A polymorphic this type represents a type that is the subtype of the containing class or interface. This is called F-bounded polymorphism. This makes hierarchical fluent interfaces much easier to express, for example. Take a simple calculator that returns this after each operation:

```javascript
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Polymorphic this types
- Since the class uses this types, you can extend it and the new class can use the old methods with no changes.

```javascript
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Polymorphic this types
- Without this types, ScientificCalculator would not have been able to extend BasicCalculator and keep the fluent interface. multiply would have returned BasicCalculator, which doesn’t have the sin method. However, with this types, multiply returns this, which is ScientificCalculator here.




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Advanced Types
## Questions




