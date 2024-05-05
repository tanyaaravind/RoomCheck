import path from "path";
import express, { Express } from "express";
import cors from "cors";
import fetch from "node-fetch";
import { db } from "./firebase";

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());


app.get("/get-all-users", async (req, res) => {
    console.log("GET /api/get-everything was called");
    const usersCollection = db.collection("Users");
    const doc = await usersCollection.get();

    const allUsers: Record<string, any> = {};
    doc.forEach((d) => {
        console.log("d: ", d.id, d.data());
        allUsers[d.id] = d.data();
    });

    res.json(allUsers);
});

app.listen(port, hostname, () => {
    console.log("Listening");
});
