<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Namespaces
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [First steps](#first-steps)
- [Namespacing](#namespacing)
- [Splitting Across Files](#splitting-across-files)
- [Aliases](#aliases)
- [Working with Other JavaScript Libraries](#working-with-other-javascript-libraries)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Introduction


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- This post outlines the various ways to organize your code using namespaces (previously “internal modules”) in TypeScript. As we alluded in our note about terminology, “internal modules” are now referred to as “namespaces”. Additionally, anywhere the module keyword was used when declaring an internal module, the namespace keyword can and should be used instead. This avoids confusing new users by overloading them with similarly named terms.




<!-- section start -->
<!-- attr: { id:'first-steps', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# First steps


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# First steps
- Let’s start with the program we’ll be using as our example throughout this page. We’ve written a small set of simplistic string validators, as you might write to check a user’s input on a form in a webpage or check the format of an externally-provided data file.
- Let’s start with the program we’ll be using as our example throughout this page. We’ve written a small set of simplistic string validators, as you might write to check a user’s input on a form in a webpage or check the format of an externally-provided data file.

```javascript
interface StringValidator {
    isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${ s }' ${ isMatch ? "matches" : "does not match" } '${ name }'.`);
    }
}

```





<!-- section start -->
<!-- attr: { id:'namespacing', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Namespacing


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Namespacing
- As we add more validators, we’re going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collisions with other objects. Instead of putting lots of different names into the global namespace, let’s wrap up our objects into a namespace.
- In this example, we’ll move all validator-related entities into a namespace called Validation. Because we want the interfaces and classes here to be visible outside the namespace, we preface them with export. Conversely, the variables lettersRegexp and numberRegexp are implementation details, so they are left unexported and will not be visible to code outside the namespace. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace, e.g. Validation.LettersOnlyValidator.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Namespacing
- In this example, we’ll move all validator-related entities into a namespace called Validation. Because we want the interfaces and classes here to be visible outside the namespace, we preface them with export. Conversely, the variables lettersRegexp and numberRegexp are implementation details, so they are left unexported and will not be visible to code outside the namespace. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace, e.g. Validation.LettersOnlyValidator.

```javascript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 &amp;&amp; numberRegexp.test(s);
        }
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (var name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}

```





<!-- section start -->
<!-- attr: { id:'splitting-across-files', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files
- As our application grows, we’ll want to split the code across multiple files to make it easier to maintain.
- As our application grows, we’ll want to split the code across multiple files to make it easier to maintain.
- Here, we’ll split our Validation namespace across many files. Even though the files are separate, they can each contribute to the same namespace and can be consumed as if they were all defined in one place. Because there are dependencies between files, we’ll add reference tags to tell the compiler about the relationships between the files. Our test code is otherwise unchanged.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files
- Here, we’ll split our Validation namespace across many files. Even though the files are separate, they can each contribute to the same namespace and can be consumed as if they were all defined in one place. Because there are dependencies between files, we’ll add reference tags to tell the compiler about the relationships between the files. Our test code is otherwise unchanged.

```javascript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}

```


```javascript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}

```


```javascript
/// &lt;reference path="Validation.ts" /&gt;
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files

```javascript
/// &lt;reference path="Validation.ts" /&gt;
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}

```


```javascript
/// &lt;reference path="Validation.ts" /&gt;
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 &amp;&amp; numberRegexp.test(s);
        }
    }
}

```


```javascript
/// &lt;reference path="Validation.ts" /&gt;
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 &amp;&amp; numberRegexp.test(s);
        }
    }
}

```


```javascript
/// &lt;reference path="Validation.ts" /&gt;
/// &lt;reference path="LettersOnlyValidator.ts" /&gt;
/// &lt;reference path="ZipCodeValidator.ts" /&gt;

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(""" + s + "" " + (validators[name].isAcceptable(s) ? " matches " : " does not match ") + name);
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files
- Once there are multiple files involved, we’ll need to make sure all of the compiled code gets loaded. There are two ways of doing this.
- First, we can use concatenated output using the --outFile flag to compile all of the input files into a single JavaScript output file:

```javascript
tsc --outFile sample.js Test.ts

```

- The compiler will automatically order the output file based on the reference tags present in the files. You can also specify each file individually:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files

```javascript
tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts

```

- Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we’ll need to use &lt;script&gt; tags on our webpage to load each emitted file in the appropriate order, for example:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Splitting Across Files
- Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we’ll need to use &lt;script&gt; tags on our webpage to load each emitted file in the appropriate order, for example:

```javascript
    &lt;script src="Validation.js" type="text/javascript" /&gt;
    &lt;script src="LettersOnlyValidator.js" type="text/javascript" /&gt;
    &lt;script src="ZipCodeValidator.js" type="text/javascript" /&gt;
    &lt;script src="Test.js" type="text/javascript" /&gt;

```





<!-- section start -->
<!-- attr: { id:'aliases', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Aliases


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Aliases
- Another way that you can simplify working with of namespaces is to use import q = x.y.z to create shorter names for commonly-used objects. Not to be confused with the import x = require("name") syntax used to load modules, this syntax simply creates an alias for the specified symbol. You can use these sorts of imports (commonly referred to as aliases) for any kind of identifier, including objects created from module imports.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Aliases

```javascript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'

```

- Notice that we don’t use the require keyword; instead we assign directly from the qualified name of the symbol we’re importing. This is similar to using var, but also works on the type and namespace meanings of the imported symbol. Importantly, for values, import is a distinct reference from the original symbol, so changes to an aliased var will not be reflected in the original variable.




<!-- section start -->
<!-- attr: { id:'working-with-other-javascript-libraries', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Working with Other JavaScript Libraries


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Other JavaScript Libraries
- To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes. Because most JavaScript libraries expose only a few top-level objects, namespaces are a good way to represent them.
- We call declarations that don’t define an implementation “ambient”. Typically these are defined in .d.ts files. If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Other JavaScript Libraries
- We call declarations that don’t define an implementation “ambient”. Typically these are defined in .d.ts files. If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.
- The popular library D3 defines its functionality in a global object called d3. Because this library is loaded through a &lt;script&gt; tag (instead of a module loader), its declaration uses namespaces to define its shape. For the TypeScript compiler to see this shape, we use an ambient namespace declaration. For example, we could begin writing it as follows:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Other JavaScript Libraries
- The popular library D3 defines its functionality in a global object called d3. Because this library is loaded through a &lt;script&gt; tag (instead of a module loader), its declaration uses namespaces to define its shape. For the TypeScript compiler to see this shape, we use an ambient namespace declaration. For example, we could begin writing it as follows:

```javascript
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;

```





<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Namespaces
## Questions




