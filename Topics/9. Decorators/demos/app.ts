
// Class factory decorator
function sealed(name: string) {
    return function (target: Function): void {
        console.log(`Sealing the constructor of: ${name} class`);
        Object.seal(target);
        Object.seal(target.prototype);
    }
}

// Property decorator
function myPropertyDecorator(target: Object, propertyKey: string, parameterIndex: number) {
    console.log(`${target} | ${propertyKey} | ${parameterIndex}`)
}

// Method decorator
function writable(isWritable: boolean) {
    return function (target: Object, propertyKey: String, descriptor: PropertyDescriptor) {
        // console.log(`${target} | ${propertyKey} | ${descriptor}`);
        descriptor.writable = isWritable;
    };
}

@sealed("University")
class School {
    constructor(public name: string, public capacity: number) {
    }

    @writable(true)
    public addToClass(student: string): void {
        console.log(`${student} is added to the class`);
    }

    @writable(false)
    public removeFromClass(student: string): void {
        console.log(`${student} is removed from the class`);
    }
}

let school = new School("X", 10);

try {
    school.addToClass = () => console.log("new implementation for AddToClass");
    school.removeFromClass = () => console.log("new implementation for RemoveFromClass");
} catch (err) {
    console.log(err.message);
}

// Uses the new implementation
school.addToClass("New guy");

// Uses the old implementation
school.removeFromClass("That old guy");
