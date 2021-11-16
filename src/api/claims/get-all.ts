import { Request, Response } from "express";

import claimsDB from "../../database/claims";

export async function getClaims(req: Request, res: Response) {
    try {
        let { page } = req.query as any;
        let offset: number;

        if(!page) {
            page = 1;
            offset = 0;
        }
        else {
            page = Number(page);
            offset = 10 * (page - 1);
        }

        const { totalClaims, someClaims: claims } = await claimsDB.getAllClaims(offset) as any;

        for (const claim of claims) {
            claim.image = `localhost:4200/claims/${claim.image}`; 
        }

        const totalPages = Math.ceil(totalClaims / 10);
        if(page > totalPages) {
            return res.json({
                meta: {
                    status: 200,
                    message: "Esta pagina no existe"
                }
            });
        }

        let nextPage = `localhost:4200/claims?page=${page + 1}`;
        let previousPage = `localhost:4200/claims?page=${page - 1}`;
        if(page == 1) {
            previousPage = null;
        }
        if(page == totalPages) {
            nextPage = null;
        }

        const response = {
            meta: {
                status: 200,
                nextPage,
                previousPage,
                amountShown: claims.length,
                totalClaims,
            },
            data: claims
        }

        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}
