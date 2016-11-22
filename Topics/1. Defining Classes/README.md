<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Defining classes
## Classes, fields, constructors, methods, properties, inheritance, encapsulation, enumerations
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik School Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction to OOP](#intro-oop)
- [Defining classes](#defining-classes)
- [Using fields and properties](#field-properties)
- [Using constructors](#using-constructors)
- [Inheritance](#inheritance)
- [Access modifiers](#access-modifiers)
- [Encapsulation](#encapsulation)
- [Enumerations](#enumerations)




<!-- attr: { id:'intro-oop', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- section start -->
<!-- # Defining simple classes -->




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes in OOP
- **Classes** model real-world objects and define
  - **Attributes** (state, properties, fields) and
  - **Behavior** (methods, operations)
- Classes describe the structure of objects
  - Objects describe particular instance of a class
- Properties hold information about the modeled object relevant to the problem
- Operations implement the object behavior




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes in TypeScript
- Classes in TypeScript can have **members**:
  - Fields, constants, methods, properties, constructors, …
- Members can have access modifiers (scope)
  - **public**, **private**, **protected**
- Members can be
  - **static** (common) or **specific** for a given object


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Simple class definition  
```cs
class Person {
		protected _fullName: string;

		constructor(fullName: string) {
				this._fullName = fullName;
		}

		public get fullName(): string {
				return this._fullName;
		}
}
```




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Simple class definition
```cs
class Student extends Person {
    private _university: string;

    constructor(fullName: string, university: string) {
        super(fullName);
        this._university = university;
    }

    public get university(): string {
        return this._university;
    }

    public introduce(): string {
        return `Hello, my name is ${this._fullName}.
                I study in the ${this._university}`;
    }
}
```




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Class Definition and <br/>Members
- **Class definition** consists of:
  - Class declaration
  - Inherited class or implemented interfaces
	- Constructors
  - Fields (static or not)
  - Properties (static or not)
  - Methods (static or not)




<!-- section start -->
<!-- attr: { class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Fields
## Defining and Using Data Fields -->




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Fields
- Fields are **data members**defined inside a class
  - Fields hold the internal object state
  - Can be **static** or per instance
  - Can be **private** / **public** / **protected** / …

```cs
class Dog {
   private name: string;
   private breed: string;
   private age: number;
   protected color: ColorType;
}
```

<div class="fragment balloon" style="top:51.73%; left:60.83%; width:26.45%">Field declarations</div>




<!-- attr: { showInPresentation:true, hasScriptWrapper:false } -->
# Constant Fields
- **Constant fields** are of two types:
  - Compile-time constants – **const**
    - Replaced by their value during the compilation
    - Can contain only values, known at compile time
  - Runtime constants – **readonly**
    - Assigned once only at object creation
    - Can contain values, calculated run time

```cs
class Math {
   public const PI: number = 3.14159;
   public readonly Color: ColorType;

	 constructor(color: ColorType) {
		 this.Color = color;
	 }
}
```




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# Variable Declarations
## Questions
