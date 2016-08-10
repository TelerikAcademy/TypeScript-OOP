<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Enums
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Enums](#enums)
- [Ambient enums](#ambient-enums)






<!-- section start -->
<!-- attr: { id:'enums', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Enums
- Enums allow us to define a set of named numeric constants. An enum can be defined using the enum keyword.

```javascript
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

```

- The body of an enum consists of zero or more enum members. Enum members have numeric value associated with them and can be either constant or computed. An enum member is considered constant if:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->
- The body of an enum consists of zero or more enum members. Enum members have numeric value associated with them and can be either constant or computed. An enum member is considered constant if:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->
- In all other cases enum member is considered computed.

```javascript
enum FileAccess {
    // constant members
    None,
    Read    = 1 &lt;&lt; 1,
    Write   = 1 &lt;&lt; 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}

```

- Enums are real objects that exist at runtime. One reason is the ability to maintain a reverse mapping from enum values to enum names.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->

```javascript
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[Enum.A]; // "A"

```

- is compiled to:

```javascript
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[Enum.A]; // "A"

```

- In generated code an enum is compiled into an object that stores both forward (name -&gt; value) and reverse (value -&gt; name) mappings. References to enum members are always emitted as property accesses and never inlined. In lots of cases this is a perfectly valid solution. However sometimes requirements are tighter. To avoid paying the cost of extra generated code and additional indirection when accessing enum values it is possible to use const enums. Const enums are defined using the const modifier that precedes the enum keyword.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->

```javascript
const enum Enum {
    A = 1,
    B = A * 2
}

```

- Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

```javascript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Enums -->
- in generated code will become

```javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

```





<!-- section start -->
<!-- attr: { id:'ambient-enums', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Ambient enums -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Ambient enums
- Ambient enums are used to describe the shape of already existing enum types.

```javascript
declare enum Enum {
    A = 1,
    B,
    C = 2
}

```

- One important difference between ambient and non-ambient enums is that, in regular enums, members that don’t have an initializer are considered constant members. For non-const ambient enums member that does not have initializer is considered computed.




<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Enums
## Questions




