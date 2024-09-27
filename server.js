require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000; 
const prompt= require("prompt-sync")();
const mongoose = require("mongoose");




app.get('/', (req, res) => {
  res.send('Hello There!');
}); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const displayWelcomeMessage = () => {
    console.log("Welcome to the Customer Managment System!");

}; 
const displayMenu = () => {
    console.log("\choose an action:");
    console.log("1. Creat a new customer");
    console.log("2. View all customers");
    console.log("3. Update a customer");
    console.log("4. Delete a customer");
    console.log("5. Quit"); 

};
const creatCustomer = async () => {
    const name = prompt("Enter customer name: ");
    const ageInput = prompt("Enter customer age: ");
    const age= parseInt(ageInput, 10);
    if (isNaN(age) || age < 0) {
        console.log("Please enter a vaild age (a non-negative number");
        return;
    }
    const newCustomer = new Customer({ name, age });
    await newCustomer.save();
    console.log("Customer created successfully!")
};
const viewCustomers = async () => {
    const customers = await Customer.find();
    console.log("Below is a list of customers:")
   /* if (customers.length === 0 ) {
        console.log("No customers found.");
       
    } else { 
    console.log("Customers:");*/
    customers.forEach(customer => {
        console.log(`ID: ${customer._id}, Name: ${customer.name} Age:${customer.age}`);

    });
    console.log();
};


const updateCustomer = async () => {
    const customers = await Customer.find();
    
    console.log("Below is a list of customers:");
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("Copy and paste the id of the customer you would like to update here: ");
    const customer = await Customer.findById(id);

    if (!customer) {
        console.log("Customer not found.");
        return;
    }

    const newName = prompt("What is the customer's new name? ");
    const newAgeInput = prompt("What is the customer's new age? ");
    const newAge = parseInt(newAgeInput, 10);

    if (isNaN(newAge) || newAge < 0) {
        console.log("Please enter a valid age (a non-negative number).\n");
        return;
    }
    customer.name = newName;
    customer.age = newAge;
    await customer.save();
    console.log("Customer updated successfully!\n");
};





    const deleteCustomer = async () => {
        const customers = await Customer.find();
       
            console.log("Below is a list.");
        

        customers.forEach(customer => {
            console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("Copy and past the id of the deleted customer ");
    const result = await Customer.deleteOne({_id: id});
    if (result.deletedCount === 0) {
        console.log("Customer not found.");
    } else {
        console.log("Customer deleted sccessfully.")
    }
    };
    const runApp = async () => {
        let action;
        do {
            action = menu();
            switch (action) {
                case '1':
                    await createCustomer();
                    break; 
                case '2':
                    await viewCustomers();
                    break;
                case '3':
                    await updateCustomer();
                    break;
                case '4':
                    await deleteCustomer();
                    break;
                case '5':
                    console.log("Exiting the Application...");
                    await mongoose.connection.close();
                    break;
                default:
                    console.log("Invalid choice. Please try again.\n");
            }
        } while (action !== '5');
    };
    
    runApp();
    
    await mongoose.connection.close();
    console.log("Exiting");
    app.listen(3000, () =>
        console.log("Intro to mongoose port 3000")
      );