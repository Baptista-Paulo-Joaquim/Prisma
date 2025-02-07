const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const cors = require("cors");
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json())

//Fetches users
app.get("/read", async (req, res) => {
    try {
        let users = await prisma.user.findMany();
        return res.json(users);

    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Failed to retrieve users." });
    }
});

//Ge user by ID
app.get("/user/:id", async (req, res) => {
    let id = Number(req.params.id);
    try {
        let user = await prisma.user.findUnique({ where : { id }  })
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to find a user." });
    }
    
});

//Create user
app.post("/create/user", async (req, res) => {
    try {
        let { name, email } = req.body;

        await prisma.user.create({ data: { name, email } })
        .then((res) => {
            res.json(user);
        }).catch((error) => {
            res.json({ axios: error.message });
        })
    } catch (error) {
        res.json({ error: error.message });
    }
});

//DELETES A USER
app.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        let user = await prisma.user.delete({ where: { id } })
        .then((res) => {
            res.json(user);
        }).catch((error) => {
            res.json(error);
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user." });
    }
});

//UPDATES USER
app.put("/edit/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email }
        });
        res.json(updatedUser);
    } catch (error) {
        res.json({ error: "Failed to update user." });
    }
});

app.listen(PORT, (error) => {
    if(error) return error;
    console.log(`Server running on port ${PORT}`)
})