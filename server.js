const express = require('express');
const app = express();
const port = 3000; 
const prompt= require("prompt-sync")();
const mongoose = require("mongoose");
require("dotenv").config();



app.get('/', (req, res) => {
  res.send('Hello There!');
}); 

mongoose.connect(process.env.MONGODB_URI, { userNewUrlParser: true, useUnifiedTopology: true})
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
    const age = prompt("Enter customer age: ");
    const newCustomer = new Customer({ name, age });
    await newCustomer.save();
    console.log("Customer created successfully!")
};
const viewCustomers = async () => {
    const customers = await Customer.find();
    if (customers.length === 0 ) {
        console.log("No customers found.");
       
    } else { 
    console.log("Customers:");
    customers.forEach(customer => {
        console.log(`ID: ${customer._id}, Name: ${customer.name} Age:${customer.age}`);

    });
}

};
const updateCustomer = async () => {
    const customers = await Customer.find();
    if (customers.length === 0 ) {
        console.log("No customers found.");
        return; 
    }
    console.log("Below is a list of customers:");
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })};
   
    const deleteCustomer = async () => {
        const customers = await Customer.find();
        if (customers.length === 0 ) {
            console.log("No customers found.");
            return; 
        }
        console.log("list of customers:");
        customers.forEach(customer => {
            console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })};
    await mongoose.connection.close();
    console.log("Exiting");