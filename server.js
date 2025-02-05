const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const cors = require("cors");
const app = express();
const PORT = 5000;


app.use(cors());

//Fetches users
app.get("/read", async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json({ message: "Users retrieved successfully"});
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Failed to retrieve users." });
    }
});

//See user
app.get("/user/:id", async (req, res) => {
    let id = req.params.id;

    try {
        const newUser = await prisma.user.findFirst({
            where : { id: Number(id) } 
        });
        
        console.log("Found!", newUser);
        res.status(201).json({ message: "User found successfully!" });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to find a user." });
    }
});

//Create user
app.post("/create/user", async (req, res) => {
    try {
        let { name, email } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email }
        });
        console.log("User Created!", newUser);
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user." });
    }
});

//DELETES A USER
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: 2 },
        });
        res.status(200).json({ message: "User deleted successfully", });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user." });
    }
});

//UPDATES USER
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: 2 },
            data: { 
                    name: "Lia", 
                    email: "liaassanejacole@gmail.com"
                }
        });
        res.status(200).json({ message: "User updated successfully", });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user." });
    }
});

app.listen(PORT, (error) => {
    if(error) return error;
    console.log(`Server running on port ${PORT}`)
})