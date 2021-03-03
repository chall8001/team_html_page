class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
        
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return "employee"
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
    super(name, id, email)
    this.officeNumber = officeNumber
    }
    getRole(){
        return "manager"
    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

class Engineer extends Employee {
    constructor(name, id, email, gitHub){
    super(name, id, email)
    this.gitHub = gitHub
    }
    getRole(){ 
        return "engineer"
    }
    getGitHub(){ 
        return this.github
    }
}

class Intern extends Employee {
    constructor(name, id, email, school){
    super(name, id, email)
    this.school = school
    }
    getSchool(){
        return this.school
    }
    getRole(){
        return "intern"
    }
}

module.exports = {Manager, Engineer, Intern} 
