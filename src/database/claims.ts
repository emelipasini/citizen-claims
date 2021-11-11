import { Collection, MongoClient } from "mongodb";
import config from "config";

import { Claim } from "../domain/claim";

let claims: Collection;

export default class claimsDB {
    static async injectDB(conn: MongoClient) {
        if(claims) {
            return;
        }
        try {
           claims = conn.db(config.get("dbName")).collection("claims"); 
        } catch (error) {
           console.error(`Unable to establish collection handles in claims database ${error}`);
        }
    }

    static async addClaim(claim: Claim) {
        try {
            await claims.insertOne(claim); 
        } catch (error) {
            console.error(`Error occurred while adding claim, ${error}`);
            return { error };
        }
    }
}
