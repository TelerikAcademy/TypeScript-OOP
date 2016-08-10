<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Modules
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [Export](#export)
- [Import](#import)
- [Default exports](#default-exports)
- [export = and import = require()](#export-=-and-import-=-require())
- [Code Generation for Modules](#code-generation-for-modules)
- [Simple Example](#simple-example)
- [Optional Module Loading and Other Advanced Loading Scenarios](#optional-module-loading-and-other-advanced-loading-scenarios)
- [Working with Other JavaScript Libraries](#working-with-other-javascript-libraries)


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Guidance for structuring modules](#guidance-for-structuring-modules)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Introduction -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- Starting with the ECMAScript 2015, JavaScript has a concept of modules. TypeScript shares this concept.
- Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Introduction -->
- Modules are declarative; the relationships between modules are specified in terms of imports and exports at the file level.
- Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. Well-known modules loaders used in JavaScript are the CommonJS module loader for Node.js and require.js for Web applications.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Introduction -->
- In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.




<!-- section start -->
<!-- attr: { id:'export', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Export -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Export
- In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.
- Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the export keyword.
- Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the export keyword.

```javascript
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

```


```javascript
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

```


```javascript
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Export -->

```javascript
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}

```

- Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:

```javascript
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Export -->

```javascript
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

```

- Often modules extend other modules, and partially expose some of their features. A re-export does not import it locally, or introduce a local variable.
- Often modules extend other modules, and partially expose some of their features. A re-export does not import it locally, or introduce a local variable.

```javascript
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; parseInt(s).toString() === s;
    }
}

// Export original validator but rename it
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Export -->
- Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.
- Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.

```javascript
export * from "./StringValidator"; // exports interface 'StringValidator'
export * from "./LettersOnlyValidator"; // exports class 'LettersOnlyValidator'
export * from "./ZipCodeValidator";  // exports class 'ZipCodeValidator'

```





<!-- section start -->
<!-- attr: { id:'import', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Import -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Import
- Importing is just about as easy as exporting from an module. Importing an exported declaration is done through using one of the import forms below:
- Importing is just about as easy as exporting from an module. Importing an exported declaration is done through using one of the import forms below:

```javascript
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();

```

- imports can also be renamed

```javascript
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Import -->

```javascript
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

```


```javascript
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

```


```javascript
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

```

- Though not recommended practice, some modules set up some global state that can be used by other modules. These modules may not have any exports, or the consumer is not interested in any of their exports. To import these modules, use:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Import -->

```javascript
import "./my-module.js";

```





<!-- section start -->
<!-- attr: { id:'default-exports', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Default exports -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Default exports
- Each module can optionally export a default export. Default exports are marked with the keyword default; and there can only be one default export per module. default exports are imported using a different import form.
- default exports are really handy. For instance, a library like JQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Default exports -->
- default exports are really handy. For instance, a library like JQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.

```javascript
declare let $: JQuery;
export default $;

```


```javascript
declare let $: JQuery;
export default $;

```


```javascript
import $ from "JQuery";

$("button.continue").html( "Next Step..." );

```

- Classes and function declarations can be authored directly as default exports. Default export class and function declaration names are optional.
- Classes and function declarations can be authored directly as default exports. Default export class and function declaration names are optional.

```javascript
export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; ZipCodeValidator.numberRegexp.test(s);
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Default exports -->

```javascript
export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; ZipCodeValidator.numberRegexp.test(s);
    }
}

```


```javascript
import validator from "./ZipCodeValidator";

let myValidator = new validator();

```

- or
- or

```javascript
const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
    return s.length === 5 &amp;&amp; numberRegexp.test(s);
}

```


```javascript
const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
    return s.length === 5 &amp;&amp; numberRegexp.test(s);
}

```


```javascript
import validate from "./StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s =&gt; {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Default exports -->
- default exports can also be just values:
- default exports can also be just values:

```javascript
export default "123";

```


```javascript
export default "123";

```


```javascript
import num from "./OneTwoThree";

console.log(num); // "123"

```





<!-- section start -->
<!-- attr: { id:'export-=-and-import-=-require()', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!--  -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- Both CommonJS and AMD generally have the concept of an exports object which contains all exports from a module.
- They also support replacing the exports object with a custom single object. Default exports are meant to act as a replacement for this behavior; however, the two are incompatible. TypeScript supports export = to model the traditional CommonJS and AMD workflow.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.
- When importing a module using export =, TypeScript-specific import let = require("module") must be used to import the module.
- When importing a module using export =, TypeScript-specific import let = require("module") must be used to import the module.

```javascript
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}
export = ZipCodeValidator;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->


```javascript
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}
export = ZipCodeValidator;

```


```javascript
import zip = require("./ZipCodeValidator");

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new zip();

// Show whether each string passed each validator
strings.forEach(s =&gt; {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});

```





<!-- section start -->
<!-- attr: { id:'code-generation-for-modules', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Code Generation for Modules -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Code Generation for Modules
- Depending on the module target specified during compilation, the compiler will generate appropriate code for Node.js (CommonJS), require.js (AMD), isomorphic (UMD), SystemJS, or ECMAScript 2015 native modules (ES6) module-loading systems. For more information on what the define, require and register calls in the generated code do, consult the documentation for each module loader.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Code Generation for Modules -->
- This simple example shows how the names used during importing and exporting get translated into the module loading code.
- This simple example shows how the names used during importing and exporting get translated into the module loading code.

```javascript
import m = require("mod");
export let t = m.something + 1;

```


```javascript
import m = require("mod");
export let t = m.something + 1;

```


```javascript
define(["require", "exports", "./mod"], function (require, exports, mod_1) {
    exports.t = mod_1.something + 1;
});

```


```javascript
define(["require", "exports", "./mod"], function (require, exports, mod_1) {
    exports.t = mod_1.something + 1;
});

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Code Generation for Modules -->

```javascript
var mod_1 = require("./mod");
exports.t = mod_1.something + 1;

```


```javascript
var mod_1 = require("./mod");
exports.t = mod_1.something + 1;

```


```javascript
(function (factory) {
    if (typeof module === "object" &amp;&amp; typeof module.exports === "object") {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" &amp;&amp; define.amd) {
        define(["require", "exports", "./mod"], factory);
    }
})(function (require, exports) {
    var mod_1 = require("./mod");
    exports.t = mod_1.something + 1;
});

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Code Generation for Modules -->

```javascript
(function (factory) {
    if (typeof module === "object" &amp;&amp; typeof module.exports === "object") {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" &amp;&amp; define.amd) {
        define(["require", "exports", "./mod"], factory);
    }
})(function (require, exports) {
    var mod_1 = require("./mod");
    exports.t = mod_1.something + 1;
});

```


```javascript
System.register(["./mod"], function(exports_1) {
    var mod_1;
    var t;
    return {
        setters:[
            function (mod_1_1) {
                mod_1 = mod_1_1;
            }],
        execute: function() {
            exports_1("t", t = mod_1.something + 1);
        }
    }
});

```


```javascript
System.register(["./mod"], function(exports_1) {
    var mod_1;
    var t;
    return {
        setters:[
            function (mod_1_1) {
                mod_1 = mod_1_1;
            }],
        execute: function() {
            exports_1("t", t = mod_1.something + 1);
        }
    }
});

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Code Generation for Modules -->

```javascript
import { something } from "./mod";
export var t = something + 1;

```





<!-- section start -->
<!-- attr: { id:'simple-example', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Simple Example -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Simple Example
- Below, we’ve consolidated the Validator implementations used in previous examples to only export a single named export from each module.
- To compile, we must specify a module target on the command line. For Node.js, use --module commonjs; for require.js, use --module amd. For example:

```javascript
tsc --module commonjs Test.ts

```

- When compiled, each module will become a separate .js file. As with reference tags, the compiler will follow import statements to compile dependent files.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Simple Example -->
- When compiled, each module will become a separate .js file. As with reference tags, the compiler will follow import statements to compile dependent files.

```javascript
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

```


```javascript
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

```


```javascript
import { StringValidator } from "./Validation";

const lettersRegexp = /^[A-Za-z]+$/;

export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

```


```javascript
import { StringValidator } from "./Validation";

const lettersRegexp = /^[A-Za-z]+$/;

export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Simple Example -->

```javascript
import { StringValidator } from "./Validation";

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}

```


```javascript
import { StringValidator } from "./Validation";

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 &amp;&amp; numberRegexp.test(s);
    }
}

```


```javascript
import { StringValidator } from "./Validation";
import { ZipCodeValidator } from "./ZipCodeValidator";
import { LettersOnlyValidator } from "./LettersOnlyValidator";

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
strings.forEach(s =&gt; {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
});

```





<!-- section start -->
<!-- attr: { id:'optional-module-loading-and-other-advanced-loading-scenarios', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Optional Module Loading and Other Advanced Loading Scenarios -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Optional Module Loading and Other Advanced Loading Scenarios
- In some cases, you may want to only load a module under some conditions. In TypeScript, we can use the pattern shown below to implement this and other advanced loading scenarios to directly invoke the module loaders without losing type safety.
- The compiler detects whether each module is used in the emitted JavaScript. If a module identifier is only ever used as part of a type annotations and never as an expression, then no require call is emitted for that module. This elision of unused references is a good performance optimization, and also allows for optional loading of those modules.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Optional Module Loading and Other Advanced Loading Scenarios -->
- The core idea of the pattern is that the import id = require("...") statement gives us access to the types exposed by the module. The module loader is invoked (through require) dynamically, as shown in the if blocks below. This leverages the reference-elision optimization so that the module is only loaded when needed. For this pattern to work, it’s important that the symbol defined via an import is only used in type positions (i.e. never in a position that would be emitted into the JavaScript).


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Optional Module Loading and Other Advanced Loading Scenarios -->
- To maintain type safety, we can use the typeof keyword. The typeof keyword, when used in a type position, produces the type of a value, in this case the type of the module.
- To maintain type safety, we can use the typeof keyword. The typeof keyword, when used in a type position, produces the type of a value, in this case the type of the module.

```javascript
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Optional Module Loading and Other Advanced Loading Scenarios -->

```javascript
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}

```


```javascript
declare function require(moduleNames: string[], onLoad: (...args: any[]) =&gt; void): void;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    require(["./ZipCodeValidator"], (ZipCodeValidator: typeof Zip) =&gt; {
        let validator = new ZipCodeValidator();
        if (validator.isAcceptable("...")) { /* ... */ }
    });
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Optional Module Loading and Other Advanced Loading Scenarios -->

```javascript
declare function require(moduleNames: string[], onLoad: (...args: any[]) =&gt; void): void;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    require(["./ZipCodeValidator"], (ZipCodeValidator: typeof Zip) =&gt; {
        let validator = new ZipCodeValidator();
        if (validator.isAcceptable("...")) { /* ... */ }
    });
}

```


```javascript
declare const System: any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    System.import("./ZipCodeValidator").then((ZipCodeValidator: typeof Zip) =&gt; {
        var x = new ZipCodeValidator();
        if (x.isAcceptable("...")) { /* ... */ }
    });
}

```





<!-- section start -->
<!-- attr: { id:'working-with-other-javascript-libraries', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Other JavaScript Libraries
- To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes.
- We call declarations that don’t define an implementation “ambient”. Typically, these are defined in .d.ts files. If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.
- We call declarations that don’t define an implementation “ambient”. Typically, these are defined in .d.ts files. If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.
- In Node.js, most tasks are accomplished by loading one or more modules. We could define each module in its own .d.ts file with top-level export declarations, but it’s more convenient to write them as one larger .d.ts file. To do so, we use a construct similar to ambient namespaces, but we use the module keyword and the quoted name of the module which will be available to a later import. For example:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->
- In Node.js, most tasks are accomplished by loading one or more modules. We could define each module in its own .d.ts file with top-level export declarations, but it’s more convenient to write them as one larger .d.ts file. To do so, we use a construct similar to ambient namespaces, but we use the module keyword and the quoted name of the module which will be available to a later import. For example:

```javascript
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export var sep: string;
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->
- Now we can /// &lt;reference&gt; node.d.ts and then load the modules using import url = require("url");.

```javascript
/// &lt;reference path="node.d.ts"/&gt;
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

```


```javascript
/// &lt;reference path="node.d.ts"/&gt;
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

```

- If you don’t want to take the time to write out declarations before using a new module, you can use a shorthand declaration to get started quickly.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->
- If you don’t want to take the time to write out declarations before using a new module, you can use a shorthand declaration to get started quickly.

```javascript
declare module "hot-new-module";

```

- All imports from a shorthand module will have the any type.

```javascript
import x, {y} from "hot-new-module";
x(y);

```


```javascript
import x, {y} from "hot-new-module";
x(y);

```

- Some module loaders such as SystemJS and AMD allow non-JavaScript content to be imported. These typically use a prefix or suffix to indicate the special loading semantics. Wildcard module declarations can be used to cover these cases.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->

```javascript
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}

```

- Now you can import things that match "*!text" or "json!*".

```javascript
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->

```javascript
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);

```

- Some libraries are designed to be used in many module loaders, or with no module loading (global variables). These are known as UMD or Isomorphic modules. These libraries can be accessed through either an import or a global variable. For example:
- Some libraries are designed to be used in many module loaders, or with no module loading (global variables). These are known as UMD or Isomorphic modules. These libraries can be accessed through either an import or a global variable. For example:

```javascript
export const isPrime(x: number): boolean;
export as namespace mathLib;

```

- The library can then be used as an import within modules:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Working with Other JavaScript Libraries -->

```javascript
import { isPrime } from "math-lib";
isPrime(2);
mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module

```

- It can also be used as a global variable, but only inside of a script. (A script is a file with no imports or exports.)

```javascript
mathLib.isPrime(2);

```





<!-- section start -->
<!-- attr: { id:'guidance-for-structuring-modules', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Guidance for structuring modules

```javascript
mathLib.isPrime(2);

```

- Consumers of your module should have as little friction as possible when using things that you export. Adding too many levels of nesting tends to be cumbersome, so think carefully about how you want to structure things.
- Exporting a namespace from your module is an example of adding too many layers of nesting. While namespaces sometimes have their uses, they add an extra level of indirection when using modules. This can quickly becomes a pain point for users, and is usually unnecessary.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Static methods on an exported class have a similar problem - the class itself adds a layer of nesting. Unless it increases expressivity or intent in a clearly useful way, consider simply exporting a helper function.
- Static methods on an exported class have a similar problem - the class itself adds a layer of nesting. Unless it increases expressivity or intent in a clearly useful way, consider simply exporting a helper function.
- Just as “exporting near the top-level” reduces friction on your module’s consumers, so does introducing a default export. If a module’s primary purpose is to house one specific export, then you should consider exporting it as a default export. This makes both importing and actually using the import a little easier. For example:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Just as “exporting near the top-level” reduces friction on your module’s consumers, so does introducing a default export. If a module’s primary purpose is to house one specific export, then you should consider exporting it as a default export. This makes both importing and actually using the import a little easier. For example:

```javascript
export default class SomeType {
  constructor() { ... }
}

```


```javascript
export default class SomeType {
  constructor() { ... }
}

```


```javascript
export default function getThing() { return "thing"; }

```


```javascript
export default function getThing() { return "thing"; }

```


```javascript
import t from "./MyClass";
import f from "./MyFunc";
let x = new t();
console.log(f());

```

- This is optimal for consumers. They can name your type whatever they want (t in this case) and don’t have to do any excessive dotting to find your objects.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- This is optimal for consumers. They can name your type whatever they want (t in this case) and don’t have to do any excessive dotting to find your objects.
- This is optimal for consumers. They can name your type whatever they want (t in this case) and don’t have to do any excessive dotting to find your objects.

```javascript
export class SomeType { /* ... */ }
export function someFunc() { /* ... */ }

```

- Conversly when importing:
- Conversly when importing:
- Conversly when importing:

```javascript
import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();

```


```javascript
import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->

```javascript
import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();

```


```javascript
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }

```


```javascript
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }

```


```javascript
import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();

```


```javascript
import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();

```

- Often you will need to extend functionality on a module. A common JS pattern is to augment the original object with extensions, similar to how JQuery extensions work. As we’ve mentioned before, modules do not merge like global namespace objects would. The recommended solution is to not mutate the original object, but rather export a new entity that provides the new functionality.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Consider a simple calculator implementation defined in module Calculator.ts. The module also exports a helper function to test the calculator functionality by passing a list of input strings and writing the result at the end.
- Consider a simple calculator implementation defined in module Calculator.ts. The module also exports a helper function to test the calculator functionality by passing a list of input strings and writing the result at the end.

```javascript
export class Calculator {
    private current = 0;
    private memory = 0;
    private operator: string;

    protected processDigit(digit: string, currentValue: number) {
        if (digit &gt;= "0" &amp;&amp; digit &lt;= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
        }
    }

    protected processOperator(operator: string) {
        if (["+", "-", "*", "/"].indexOf(operator) &gt;= 0) {
            return operator;
        }
    }

    protected evaluateOperator(operator: string, left: number, right: number): number {
        switch (this.operator) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
        }
    }

    private evaluate() {
        if (this.operator) {
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        }
        else {
            this.memory = this.current;
        }
        this.current = 0;
    }

    public handelChar(char: string) {
        if (char === "=") {
            this.evaluate();
            return;
        }
        else {
            let value = this.processDigit(char, this.current);
            if (value !== undefined) {
                this.current = value;
                return;
            }
            else {
                let value = this.processOperator(char);
                if (value !== undefined) {
                    this.evaluate();
                    this.operator = value;
                    return;
                }
            }
        }
        throw new Error(`Unsupported input: '${char}'`);
    }

    public getResult() {
        return this.memory;
    }
}

export function test(c: Calculator, input: string) {
    for (let i = 0; i &lt; input.length; i++) {
        c.handelChar(input[i]);
    }

    console.log(`result of '${input}' is '${c.getResult()}'`);
}

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Here is a simple test for the calculator using the exposed test function.
- Here is a simple test for the calculator using the exposed test function.

```javascript
import { Calculator, test } from "./Calculator";


let c = new Calculator();
test(c, "1+2*33/11="); // prints 9

```

- Now to extend this to add support for input with numbers in bases other than 10, let’s create ProgrammerCalculator.ts
- Now to extend this to add support for input with numbers in bases other than 10, let’s create ProgrammerCalculator.ts

```javascript
import { Calculator } from "./Calculator";

class ProgrammerCalculator extends Calculator {
    static digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    constructor(public base: number) {
        super();
        if (base &lt;= 0 || base &gt; ProgrammerCalculator.digits.length) {
            throw new Error("base has to be within 0 to 16 inclusive.");
        }
    }

    protected processDigit(digit: string, currentValue: number) {
        if (ProgrammerCalculator.digits.indexOf(digit) &gt;= 0) {
            return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
        }
    }
}

// Export the new extended calculator as Calculator
export { ProgrammerCalculator as Calculator };

// Also, export the helper function
export { test } from "./Calculator";

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- The new module ProgrammerCalculator exports an API shape similar to that of the original Calculator module, but does not augment any objects in the original module. Here is a test for our ProgrammerCalculator class:
- The new module ProgrammerCalculator exports an API shape similar to that of the original Calculator module, but does not augment any objects in the original module. Here is a test for our ProgrammerCalculator class:

```javascript
import { Calculator, test } from "./ProgrammerCalculator";

let c = new Calculator(2);
test(c, "001+010="); // prints 3

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->

```javascript
import { Calculator, test } from "./ProgrammerCalculator";

let c = new Calculator(2);
test(c, "001+010="); // prints 3

```

- When first moving to a module-based organization, a common tendency is to wrap exports in an additional layer of namespaces. Modules have their own scope, and only exported declarations are visible from outside the module. With this in mind, namespace provide very little, if any, value when working with modules.
- On the organization front, namespaces are handy for grouping together logically-related objects and types in the global scope. For example, in C#, you’re going to find all the collection types in System.Collections. By organizing our types into hierarchical namespaces, we provide a good “discovery” experience for users of those types. Modules, on the other hand, are already present in a file system, necessarily. We have to resolve them by path and filename, so there’s a logical organization scheme for us to use. We can have a /collections/generic/ folder with a list module in it.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Namespaces are important to avoid naming collisions in the global scope. For example, you might have My.Application.Customer.AddForm and My.Application.Order.AddForm – two types with the same name, but a different namespace. This, however, is not an issue with modules. Within a module, there’s no plausible reason to have two objects with the same name. From the consumption side, the consumer of any given module gets to pick the name that they will use to refer to the module, so accidental naming conflicts are impossible.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Guidance for structuring modules -->
- Namespaces are important to avoid naming collisions in the global scope. For example, you might have My.Application.Customer.AddForm and My.Application.Order.AddForm – two types with the same name, but a different namespace. This, however, is not an issue with modules. Within a module, there’s no plausible reason to have two objects with the same name. From the consumption side, the consumer of any given module gets to pick the name that they will use to refer to the module, so accidental naming conflicts are impossible.
- Namespaces are important to avoid naming collisions in the global scope. For example, you might have My.Application.Customer.AddForm and My.Application.Order.AddForm – two types with the same name, but a different namespace. This, however, is not an issue with modules. Within a module, there’s no plausible reason to have two objects with the same name. From the consumption side, the consumer of any given module gets to pick the name that they will use to refer to the module, so accidental naming conflicts are impossible.
- All of the following are red flags for module structuring. Double-check that you’re not trying to namespace your external modules if any of these apply to your files:
- All of the following are red flags for module structuring. Double-check that you’re not trying to namespace your external modules if any of these apply to your files:




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Modules
## Questions




