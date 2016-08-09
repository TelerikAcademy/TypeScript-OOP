<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Namespaces and Modules
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [Using Namespaces](#using-namespaces)
- [Using Modules](#using-modules)
- [Pitfalls of Namespaces and Modules](#pitfalls-of-namespaces-and-modules)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Introduction


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- This post outlines the various ways to organize your code using namespaces and modules in TypeScript. We’ll also go over some advanced topics of how to use namespaces and modules, and address some common pitfalls when using them in TypeScript.
- See the Modules documentation for more information about modules. See the Namespaces documentation for more information about namespaces.




<!-- section start -->
<!-- attr: { id:'using-namespaces', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Using Namespaces


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using Namespaces
- Namespaces are simply named JavaScript objects in the global namespace. This makes namespaces a very simple construct to use. They can span multiple files, and can be concatenated using --outFile. Namespaces can be a good way to structure your code in a Web Application, with all dependencies included as &lt;script&gt; tags in your HTML page.
- Just like all global namespace pollution, it can be hard to identify component dependencies, especially in a large application.




<!-- section start -->
<!-- attr: { id:'using-modules', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Using Modules


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using Modules
- Just like namespaces, modules can contain both code and declarations. The main difference is that modules declare their dependencies.
- Modules also have a dependency on a module loader (such as CommonJs/Require.js). For a small JS application this might not be optimal, but for larger applications, the cost comes with long term modularity and maintainability benefits. Modules provide for better code reuse, stronger isolation and better tooling support for bundling.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using Modules
- It is also worth noting that, for Node.js applications, modules are the default and the recommended approach to structure your code.
- Starting with ECMAScript 2015, modules are native part of the language, and should be supported by all compliant engine implementations. Thus, for new projects modules would be the recommended code organization mechanism.




<!-- section start -->
<!-- attr: { id:'pitfalls-of-namespaces-and-modules', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- In this section we’ll describe various common pitfalls in using namespaces and modules, and how to avoid them.
- In this section we’ll describe various common pitfalls in using namespaces and modules, and how to avoid them.
- A common mistake is to try to use the /// &lt;reference ... /&gt; syntax to refer to a module file, rather than using an import statement. To understand the distinction, we first need to understand how compiler can locate the type information for a module based on the path of an import (e.g. the ... in import x from "...";, import x = require("...");, etc.) path.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- The compiler will try to find a .ts, .tsx, and then a .d.ts with the appropriate path. If a specific file could not be found, then the compiler will look for an ambient module declaration. Recall that these need to be declared in a .d.ts file.
- The compiler will try to find a .ts, .tsx, and then a .d.ts with the appropriate path. If a specific file could not be found, then the compiler will look for an ambient module declaration. Recall that these need to be declared in a .d.ts file.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- The reference tag here allows us to locate the declaration file that contains the declaration for the ambient module. This is how the node.d.ts file that several of the TypeScript samples use is consumed.
- The reference tag here allows us to locate the declaration file that contains the declaration for the ambient module. This is how the node.d.ts file that several of the TypeScript samples use is consumed.
- If you’re converting a program from namespaces to modules, it can be easy to end up with a file that looks like this:
- If you’re converting a program from namespaces to modules, it can be easy to end up with a file that looks like this:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- The top-level module here Shapes wraps up Triangle and Square for no reason. This is confusing and annoying for consumers of your module:
- The top-level module here Shapes wraps up Triangle and Square for no reason. This is confusing and annoying for consumers of your module:
- A key feature of modules in TypeScript is that two different modules will never contribute names to the same scope. Because the consumer of a module decides what name to assign it, there’s no need to proactively wrap up the exported symbols in a namespace.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- To reiterate why you shouldn’t try to namespace your module contents, the general idea of namespacing is to provide logical grouping of constructs and to prevent name collisions. Because the module file itself is already a logical grouping, and its top-level name is defined by the code that imports it, it’s unnecessary to use an additional module layer for exported objects.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pitfalls of Namespaces and Modules
- Here’s a revised example:
- Here’s a revised example:
- Here’s a revised example:
- Just as there is a one-to-one correspondence between JS files and modules, TypeScript has a one-to-one correspondence between module source files and their emitted JS files. One effect of this is that it’s not possible to use the --outFile compiler switch to concatenate multiple module source files into a single JavaScript file.




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Namespaces and Modules
## Questions




