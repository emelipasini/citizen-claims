import { Request, Response } from "express";

import claimsDB from "../../database/claims";

export async function deleteClaim(req: Request, res: Response) {
    try {
        const claimId: string = req.params.id;

        const claim = await claimsDB.findClaim(claimId);

        if(!claim) {
            return res.status(404).json({ "message": "No se ha podido encontrar el reclamo" });
        }

        await claimsDB.deleteClaim(claimId);

        const response = {
            meta: {
                status: 200,
                message: "El reclamo fue eliminado."
            }
        }

        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}
