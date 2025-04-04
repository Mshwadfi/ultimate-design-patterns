"use strict";
//no client should be forced to depend on methods it does not use.
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    drive() {
        console.log('Car is driving');
    }
    fly() {
        throw new Error('Cars cannot fly');
    }
}
class Plane {
    drive() {
        throw new Error('Planes cannot drive');
    }
    fly() {
        console.log('Plane is flying');
    }
}
class Car_ {
    drive() {
        console.log('Car is driving');
    }
}
class Plane_ {
    fly() {
        console.log('Plane is flying');
    }
}
//Now, both classes implement only the methods they need,
//  adhering to the Interface Segregation Principle. 
