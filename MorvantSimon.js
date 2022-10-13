class User {
    constructor (name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;    
    }

    getFullName() {
        return `${this.name} ${this.lastname}`;
    }

    addPet(petName) {
        this.pets.push(petName);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(title, autor) {
        this.books.push({title, autor});
    }

    getBooksNames() {
        this.books.length.title;
    }

}

const user1 = new User("Celeste", "Ramirez", 
                        [{title:"Mala leche", autor:"Jackson Pollan"},
                         {title: "Vernon Subutex", autor: "Virginie Despentes"},
                         {title: "Lord of the ring", autor: "JRR Tolkien"}],
                        ["Dioni", "Hapi"]);


console.log(user1.addPet("Lolito"));
console.log(user1.addBook("Harry Potter", "JK Rowling"));
console.log(user1.books);
console.log(user1.pets);
console.log(user1.countPets());
console.log(user1.getBooksNames());
