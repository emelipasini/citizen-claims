import { Request, Response } from "express";

import {Claim} from "../../domain/claim";

import claimsDB from "../../database/claims";

export async function updateClaim(req: Request, res: Response) {
    try {
        const claimId: string = req.params.id;
        const claim: Claim = req.query as any;

        const claimData = await claimsDB.findClaim(claimId);
        if(!claimData) {
            return res.status(404).json({ "message": "No se pudo encontrar el reclamo" });
        }

        if(req.file) {
            claim.image = req.file.filename;
        }

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

        await claimsDB.updateClaim(claimId, claim);

        const response = {
            meta: {
                status: 200,
                message: "Reclamo editado con exito!"
            }
        }

        return res.json(response);
    } catch (error) {
        return res.status(500).json(error); 
    }
}
