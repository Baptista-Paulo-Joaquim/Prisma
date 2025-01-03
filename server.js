const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const cors = require("cors");
const app = express();
const PORT = 5000;


app.use(cors());

//Fetches users
app.get("/read_users", async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json({ message: "Users retrieved successfully", users: allUsers });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Failed to retrieve users." });
    }
});

//Create user
app.post("/create_user", async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: "Catarina",
                email: "catarinabola@gmail.com"
            }
        });
        console.log("User Created!", newUser);
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user." });
    }
});

//DELETES A USER
app.delete("/delete_user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: 2 },
        });
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user." });
    }
});

//UPDATES USER
app.put("/update_user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: 2 },
            data: { 
                    name: "Lia", 
                    email: "liaassanejacole@gmail.com"
                }
        });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user." });
    }
});



app.listen(PORT, (error) => {
    if(error) return error;
    console.log(`Server running on port ${PORT}`)
})