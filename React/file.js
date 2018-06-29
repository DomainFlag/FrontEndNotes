let fn = (() => {
    class Animal {
        constructor(data) {
            this.data = data;
        }

        speak() {
            console.log(this.data);
        }
    }

    return (data) => {
        return new Animal(data);
    }
})();


let obj = {};
obj.classConstr = fn;

let animal = obj.classConstr("Muuuuuuu");
console.log(animal.speak());
