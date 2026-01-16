// save contact to csv file as test database
import { appendFileSync } from "fs";
import prompt from "prompt";
import express from "express";

// Object to model buisness
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
  const entry = new Company(responses.name, responses.field, responses.email);
  await entry.saveToCSV();
  const { again } = await prompt.get([
    { name: "again", description: "Continue? [y to continue]" },
  ]);

  if (again.toLowerCase() === "y") 
	await startPrompt();
};

// default profile
const userProfile = { 
	"myname": "Bumblebee",
	"myfield": "Service Provider",
	"myemail": "b2b@bumble.bee"
};

// initialize webserver 
const app = express();
const port = 3000;

app.get("/", async (request, response) => {
  response.send("Welcome to Bumblebiz");
});
app.get("/b", async (request, response) => {
  response.json(userProfile);
});

await app.listen({ port });
console.log(`Web Server is listening at http://localhost:${port}`);
