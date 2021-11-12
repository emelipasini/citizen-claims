import { MongoClient } from "mongodb";
import express from "express";
import http from "http";
import config from "config";

import {claimsController} from "./src/api/claims";

import claimsDB from "./src/database/claims";

export const app = express();
const server = http.createServer(app);

app.get("/claims", claimsController.getClaims);

app.get("/");

app.post("/claims", claimsController.createClaim);

app.put("/claims/:id", claimsController.updateClaim);

app.delete("/claims/:id", claimsController.deleteClaim);

MongoClient.connect(config.get("dbURI"))
    .then(async (client) => {
        claimsDB.injectDB(client);
        server.listen("4200", () => {
            console.log("SERVER RUNNING IN PORT 4200...");
        });
    })
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    });
