//no client should be forced to depend on methods it does not use.

interface IVehicle {
    drive(): void;
    fly(): void;
}

class Car implements IVehicle {
    drive(): void {
        console.log('Car is driving');
    }
    
    fly(): void {
        throw new Error('Cars cannot fly');
    }
}

class Plane implements IVehicle {
    drive(): void {
        throw new Error('Planes cannot drive');
    }
    
    fly(): void {
        console.log('Plane is flying');
    }
}

//In this example, both Car and Plane classes 
// implement the IVehicle interface. However,
//  each class is forced to implement methods that
//   are irrelevant to its functionality. The Car class must
//    implement the fly() method, which leads to throwing an error, 
//    violating the ISP.

// Applying the ISP


interface ICar {
    drive(): void;
}

interface IPlane {
    fly(): void;
}

class Car_ implements ICar {
    drive(): void {
        console.log('Car is driving');
    }
}

class Plane_ implements IPlane {
    fly(): void {
        console.log('Plane is flying');
    }
}


//Now, both classes implement only the methods they need,
//  adhering to the Interface Segregation Principle. 