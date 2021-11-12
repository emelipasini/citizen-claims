import { createClaim } from "./create";
import {deleteClaim} from "./delete";
import { getClaims } from "./get-all";
import { updateClaim } from "./update";

export const claimsController = {
    createClaim,
    getClaims,
    deleteClaim,
    updateClaim
}
