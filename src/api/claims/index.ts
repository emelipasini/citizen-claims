import { createClaim } from "./create";
import {deleteClaim} from "./delete";
import { getClaims } from "./get-all";

export const claimsController = {
    createClaim,
    getClaims,
    deleteClaim
}
