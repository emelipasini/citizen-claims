import { Collection, MongoClient, ObjectId } from "mongodb";
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

    static async getAllClaims() {
        try {
            return await claims.find().toArray(); 
        } catch (error) {
            console.error(`Error occurred while getting claims, ${error}`);
            return { error };
        }
    }

    static async deleteClaim(id: string) {
        try {
            await claims.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error(`Error occurred while deleting claim, ${error}`);
            return { error };
        }
    }

    static async updateClaim(claimId: string, claim: Claim) {
        try {
            await claims.updateOne(
                { _id: new ObjectId(claimId) },
                {
                    $set: {
                        title: claim.title,
                        description: claim.description,
                        municipality: claim.municipality,
                        image: claim.image
                    }
                } 
            ) 
        } catch (error) {
            console.error(`Error occurred while updating claim, ${error}`);    
            return { error };
        }
    }

    static async findClaim(id: string) {
        try {
            return await claims.findOne({ _id: new ObjectId(id) }); 
        } catch (error) {
            console.error(`Error occurred while finding claim, ${error}`);
            return { error };
        }
    }
}
