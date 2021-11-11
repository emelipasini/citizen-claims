import { Request, Response } from "express";
import claimsDB from "../../database/claims";

import { Claim } from "../../domain/claim";

export async function createClaim(req: Request, res: Response) {
    try {
        const claim: Claim = req.query as any;

        if(claim.title.trim().length === 0) {
            return res.status(400).json({ "message": "El titulo es obligatorio" });            
        }
        if(claim.description.trim().length === 0) {
            return res.status(400).json({ "message": "La descripcion es obligatoria" });            
        }
        if(claim.municipality.trim().length === 0) {
            return res.status(400).json({ "message": "La comuna es obligatoria" });            
        }
        if(claim.image.trim().length === 0) {
            return res.status(400).json({ "message": "La comuna es obligatoria" });            
        }

        await claimsDB.addClaim(claim);

        return res.status(200).json("Reclamo creado con exito!");
    } catch (error) {
       return res.status(500).json(error); 
    }
}
