<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# JSX
<article class="signature">
	<p class="signature-course">TypeScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Introduction](#introduction)
- [Basic usage](#basic-usage)
- [The as operator](#the-as-operator)
- [Type Checking](#type-checking)
- [The JSX result type](#the-jsx-result-type)
- [Embedding Expressions](#embedding-expressions)
- [React integration](#react-integration)






<!-- section start -->
<!-- attr: { id:'introduction', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Introduction -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Introduction
- JSX is an embeddable XML-like syntax. It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific. JSX came to popularity with the React framework, but has since seen other applications as well. TypeScript supports embedding, type checking, and compiling JSX directly into JavaScript.




<!-- section start -->
<!-- attr: { id:'basic-usage', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Basic usage -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Basic usage
- In order to use JSX you must do two things.
- In order to use JSX you must do two things.
- TypeScript ships with two JSX modes: preserve and react. These modes only affect the emit stage - type checking is unaffected. The preserve mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel). Additionally the output will have a .jsx file extension. The react mode will emit React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Basic usage
- TypeScript ships with two JSX modes: preserve and react. These modes only affect the emit stage - type checking is unaffected. The preserve mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel). Additionally the output will have a .jsx file extension. The react mode will emit React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension.
- You can specify this mode using either the --jsx command line flag or the corresponding option in your tsconfig.json file.
- You can specify this mode using either the --jsx command line flag or the corresponding option in your tsconfig.json file.




<!-- section start -->
<!-- attr: { id:'the-as-operator', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # The as operator -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# The as operator
- Recall how to write a type assertion:

```javascript
var foo = &lt;foo&gt;bar;

```

- Here we are asserting the variable bar to have the type foo. Since TypeScript also uses angle brackets for type assertions, JSX’s syntax introduces certain parsing difficulties. As a result, TypeScript disallows angle bracket type assertions in .tsx files.
- To make up for this loss of functionality in .tsx files, a new type assertion operator has been added: as. The above example can easily be rewritten with the as operator.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# The as operator

```javascript
var foo = bar as foo;

```

- The as operator is available in both .ts and .tsx files, and is identical in behavior to the other type assertion style.




<!-- section start -->
<!-- attr: { id:'type-checking', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Type Checking -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- In order to understand type checking with JSX, you must first understand the difference between intrinsic elements and value-based elements. Given a JSX expression &lt;expr /&gt;, expr may either refer to something intrinsic to the environment (e.g. a div or span in a DOM environment) or to a custom component that you’ve created. This is important for two reasons:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- In order to understand type checking with JSX, you must first understand the difference between intrinsic elements and value-based elements. Given a JSX expression &lt;expr /&gt;, expr may either refer to something intrinsic to the environment (e.g. a div or span in a DOM environment) or to a custom component that you’ve created. This is important for two reasons:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- TypeScript uses the same convention that React does for distinguishing between these. An intrinsic element always begins with a lowercase letter, and a value-based element always begins with an uppercase letter.
- TypeScript uses the same convention that React does for distinguishing between these. An intrinsic element always begins with a lowercase letter, and a value-based element always begins with an uppercase letter.
- Intrinsic elements are looked up on the special interface JSX.IntrinsicElements. By default, if this interface is not specified, then anything goes and intrinsic elements will not be type checked. However, if interface is present, then the name of the intrinsic element is looked up as a property on the JSX.IntrinsicElements interface. For example:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking

```javascript
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

&lt;foo /&gt;; // ok
&lt;bar /&gt;; // error

```

- In the above example, &lt;foo /&gt; will work fine but &lt;bar /&gt; will result in an error since it has not been specified on JSX.IntrinsicElements.
- In the above example, &lt;foo /&gt; will work fine but &lt;bar /&gt; will result in an error since it has not been specified on JSX.IntrinsicElements.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- In the above example, &lt;foo /&gt; will work fine but &lt;bar /&gt; will result in an error since it has not been specified on JSX.IntrinsicElements.
- Value based elements are simply looked up by identifiers that are in scope.

```javascript
import MyComponent from "./myComponent";

&lt;MyComponent /&gt;; // ok
&lt;SomeOtherComponent /&gt;; // error

```

- It is possible to limit the type of a value-based element. However, for this we must introduce two new terms: the element class type and the element instance type.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- Given &lt;Expr /&gt;, the element class type is the type of Expr. So in the example above, if MyComponent was an ES6 class the class type would be that class. If MyComponent was a factory function, the class type would be that function.
- Once the class type is established, the instance type is determined by the union of the return types of the class type’s call signatures and construct signatures. So again, in the case of an ES6 class, the instance type would be the type of an instance of that class, and in the case of a factory function, it would be the type of the value returned from the function.


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking

```javascript
class MyComponent {
  render() {}
}

// use a construct signature
var myComponent = new MyComponent();

// element class type =&gt; MyComponent
// element instance type =&gt; { render: () =&gt; void }

function MyFactoryFunction() {
  return {
    render: () =&gt; {
    }
  }
}

// use a call signature
var myComponent = MyFactoryFunction();

// element class type =&gt; FactoryFunction
// element instance type =&gt; { render: () =&gt; void }

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- The element instance type is interesting because it must be assignable to JSX.ElementClass or it will result in an error. By default JSX.ElementClass is {}, but it can be augmented to limit the use of JSX to only those types that conform to the proper interface.

```javascript
declare namespace JSX JSX {
  interface ElementClass {
    render: any;
  }
}

class MyComponent {
  render() {}
}
function MyFactoryFunction() {
  return { render: () =&gt; {} }
}

&lt;MyComponent /&gt;; // ok
&lt;MyFactoryFunction /&gt;; // ok

class NotAValidComponent {}
function NotAValidFactoryFunction() {
  return {};
}

&lt;NotAValidComponent /&gt;; // error
&lt;NotAValidFactoryFunction /&gt;; // error

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking

```javascript
declare namespace JSX JSX {
  interface ElementClass {
    render: any;
  }
}

class MyComponent {
  render() {}
}
function MyFactoryFunction() {
  return { render: () =&gt; {} }
}

&lt;MyComponent /&gt;; // ok
&lt;MyFactoryFunction /&gt;; // ok

class NotAValidComponent {}
function NotAValidFactoryFunction() {
  return {};
}

&lt;NotAValidComponent /&gt;; // error
&lt;NotAValidFactoryFunction /&gt;; // error

```

- The first step to type checking attributes is to determine the element attributes type. This is slightly different between intrinsic and value-based elements.
- For intrinsic elements, it is the type of the property on JSX.IntrinsicElements

```javascript
declare namespace JSX {
  interface IntrinsicElements {
    foo: { bar?: boolean }
  }
}

// element attributes type for 'foo' is '{bar?: boolean}'
&lt;foo bar /&gt;;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- For value-based elements, it is a bit more complex. It is determined by the type of a property on the element instance type that was previously determined. Which property to use is determined by JSX.ElementAttributesProperty. It should be declared with a single property. The name of that property is then used.

```javascript
declare namespace JSX {
  interface ElementAttributesProperty {
    props; // specify the property name to use
  }
}

class MyComponent {
  // specify the property on the element instance type
  props: {
    foo?: string;
  }
}

// element attributes type for 'MyComponent' is '{foo?: string}'
&lt;MyComponent foo="bar" /&gt;

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking
- The element attribute type is used to type check the attributes in the JSX. Optional and required properties are supported.

```javascript
declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number }
  }
}

&lt;foo requiredProp="bar" /&gt;; // ok
&lt;foo requiredProp="bar" optionalProp={0} /&gt;; // ok
&lt;foo /&gt;; // error, requiredProp is missing
&lt;foo requiredProp={0} /&gt;; // error, requiredProp should be a string
&lt;foo requiredProp="bar" unknownProp /&gt;; // error, unknownProp does not exist
&lt;foo requiredProp="bar" some-unknown-prop /&gt;; // ok, because 'some-unknown-prop' is not a valid identifier

```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Type Checking

```javascript
declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number }
  }
}

&lt;foo requiredProp="bar" /&gt;; // ok
&lt;foo requiredProp="bar" optionalProp={0} /&gt;; // ok
&lt;foo /&gt;; // error, requiredProp is missing
&lt;foo requiredProp={0} /&gt;; // error, requiredProp should be a string
&lt;foo requiredProp="bar" unknownProp /&gt;; // error, unknownProp does not exist
&lt;foo requiredProp="bar" some-unknown-prop /&gt;; // ok, because 'some-unknown-prop' is not a valid identifier

```

- The spread operator also works:

```javascript
var props = { requiredProp: "bar" };
&lt;foo {...props} /&gt;; // ok

var badProps = {};
&lt;foo {...badProps} /&gt;; // error

```





<!-- section start -->
<!-- attr: { id:'the-jsx-result-type', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # The JSX result type -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# The JSX result type
- By default the result of a JSX expression is typed as any. You can customize the type by specifying the JSX.Element interface. However, it is not possible to retrieve type information about the element, attributes or children of the JSX from this interface. It is a black box.




<!-- section start -->
<!-- attr: { id:'embedding-expressions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Embedding Expressions -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Embedding Expressions
- JSX allows you to embed expressions between tags by surrounding the expressions with curly braces ({ }).

```javascript
var a = &lt;div&gt;
  {["foo", "bar"].map(i =&gt; &lt;span&gt;{i / 2}&lt;/span&gt;)}
&lt;/div&gt;

```

- The above code will result in an error since you cannot divide a string by a number. The output, when using the preserve option, looks like:

```javascript
var a = &lt;div&gt;
  {["foo", "bar"].map(function (i) { return &lt;span&gt;{i / 2}&lt;/span&gt;; })}
&lt;/div&gt;

```





<!-- section start -->
<!-- attr: { id:'react-integration', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # React integration -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# React integration
- To use JSX with React you should use the React typings. These typings define the JSX namespace appropriately for use with React.

```javascript
/// &lt;reference path="react.d.ts" /&gt;

interface Props {
  foo: string;
}

class MyComponent extends React.Component&lt;Props, {}&gt; {
  render() {
    return &lt;span&gt;{this.props.foo}&lt;/span&gt;
  }
}

&lt;MyComponent foo="bar" /&gt;; // ok
&lt;MyComponent foo={0} /&gt;; // error

```





<!-- section start -->
<!-- attr: { id:'', class:'slide-questions', showInPresentation:true, hasScriptWrapper:true } -->
# JSX
## Questions




