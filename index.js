//inititialize and import inquirer and jest
const inquirer = require('inquirer');
const fs = require('fs');
const {Manager, Engineer, Intern} = require('./library/employee.js');
const path = require('path')
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const array = []
//create an employee parent class with a name, id, email, getName(), getId(), getRole()-- this returns a multiple choice option

//create a manager subclass: officeNumber, getRole-- overwridden when manager is selected 
//create an engineer subclass: github, getGitHub(), getRole-- overwridden when engineer is selected 
//creat an intern subclass: school, getSchool(), getRole()-- overwridden when intern is selected 

//use inquirer to prompt users for theis name, ID, and email 
function manager(){
inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your ID?',
        name: 'ID',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNum',
      },
  ]).then(answers => {
      const manager = new Manager(answers.username, answers.ID, answers.email, answers.officeNum)
      array.push(manager)
      console.log(manager)
      //call a function that will ask to create a team 
     askTeam()
  }) 
}
function askTeam(){
    inquirer
  .prompt([
    {   type: "checkbox",
        choices: [ "Yes", new inquirer.Separator(), "No" ],
        message: 'Do you want to add another member?',
        name: 'ready',
      },
    ]).then(data => {
        if (data.ready == 'Yes'){
            createTeam()
            console.log("yes")
        }
        if (data.ready == 'No'){
          console.log(array)
            compile()
            console.log("no")
        }
    }) 

}
function createTeam(){
    inquirer
  .prompt([
    {   type: "checkbox",
        choices: [ "Intern", new inquirer.Separator(), "Engineer" ],
        message: 'What type of team member do you want to add?',
        name: 'teamType',
      },
    ]).then(data => {
        if (data.teamType == 'Intern'){
            intern()
        } 
        if (data.teamType == 'Engineer'){
            engineer()
        } 
    }) 

}
function engineer(){
    inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your ID?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is your gitHub Username??',
        name: 'github',
      },
    ]).then(answers => {
    const engineer = new Engineer(answers.username, answers.id, answers.email, answers.github)
    array.push(engineer)
    console.log(engineer)
      askTeam()
    })   
}
function intern(){
    inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your ID?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is your school?',
        name: 'schoolName',
      },
    ]).then(answers => {
        const intern = new Intern(answers.username, answers.id, answers.email, answers.schoolName)
        array.push(intern)
        console.log(intern)
       askTeam()
       
    }) 
}
function compile(){
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(array), "utf-8")
  
}
manager()

function render(team){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
      <center><h1>The Team</h1></center> 
      <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
            ${cardCreater(team)}
            </div>
        </div>
    </div>
  </body>
  </html>`

}

function cardCreater(team){

  const generateManager = employee => {
return `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${employee.getName()}</h5>
  <h6 class="card-title">${employee.getRole()}</h6>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${employee.getOfficeNumber()}</li>
    <li class="list-group-item">${employee.getId()}</li>
    <li class="list-group-item">${employee.getEmail()}</li>
  </ul>
</div>
</div>`
}

const generateEngineer = employee => {
  return `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${employee.getName()}</h5>
    <h6 class="card-title">${employee.getRole()}</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getGitHub()}</li>
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item">${employee.getEmail()}</li>
    </ul>
  </div>
  </div>`
  }

  const generateIntern = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-title">${employee.getRole()}</h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${employee.getSchool()}</li>
        <li class="list-group-item">${employee.getId()}</li>
        <li class="list-group-item">${employee.getEmail()}</li>
      </ul>
    </div>
    </div>`
    }
  
const html = []
html.push(team.filter(employee => employee.getRole() === "manager").map(manager => generateManager(manager)))
html.push(team.filter(employee => employee.getRole() === "engineer").map(engineer => generateEngineer(engineer)).join(""))
html.push(team.filter(employee => employee.getRole() === "intern").map(intern => generateIntern(intern)).join(""))
console.log(html)
return html.join("") 
}

//put all created objects in a global array-- put at top of file 
