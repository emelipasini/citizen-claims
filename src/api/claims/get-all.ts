import { Request, Response } from "express";

import claimsDB from "../../database/claims";

import {Claim} from "../../domain/claim";

export async function getClaims(req: Request, res: Response) {
    try {
        const claims: Claim[] = await claimsDB.getAllClaims() as any;

        const response = {
            meta: {
                status: 200,
                total: claims.length
            },
            data: claims
        }

        return res.json(response);
    } catch (error) {
        
    }
}
