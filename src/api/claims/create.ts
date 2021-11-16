import { Request, Response } from "express";

import claimsDB from "../../database/claims";

import { Claim } from "../../domain/claim";

export async function createClaim(req: Request, res: Response) {
    try {
        const claim: Claim = req.query as any;

        claim.image = req.file.filename;

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
            return res.status(400).json({ "message": "La imagen es obligatoria" });            
        }

        await claimsDB.addClaim(claim);

        const response = {
            meta: {
                status: 200,
                message: "Reclamo creado con exito!"
            }
        }

        return res.json(response);
    } catch (error) {
       return res.status(500).json(error); 
    }
}
