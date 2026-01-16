// save contact to csv file as test database
import { appendFileSync } from "fs";
import prompt from "prompt";

class Company {
  constructor(name = "", field = "", email = "") {
    this.contactname = name;
    this.field = field;
    this.email = email;
  }
  saveToCSV() {
    const content = `${this.contactname},${this.field},${this.email}\n`;
    try {
      appendFileSync("./contacts.csv", content);
	console.log(`${this.contactname} Saved!`);
    } catch (err) {
	console.error(err);
    }
  }
}

// initialise user prompt
prompt.start();
prompt.message = "";
// start main loop
const startPrompt = async () => {
  const questions = [
  { name: "name", description: "Company Name" },
  { name: "field", description: "Buisness Field" },
  { name: "email", description: "Contact Email" },
  ];

  const responses = await prompt.get(questions);
  const person = new Company(responses.name, responses.field, responses.email);
  await person.saveToCSV();
  const { again } = await prompt.get([
    { name: "again", description: "Continue? [y to continue]" },
  ]);

  if (again.toLowerCase() === "y") 
	await startPrompt();
};
