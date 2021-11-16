import express from "express";
import multer from "multer";
import path from "path";

import { createClaim } from "./create";
import {deleteClaim} from "./delete";
import { getClaims } from "./get-all";
import { updateClaim } from "./update";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../../../public/claims")); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getClaims);

router.post("/", upload.single("image"), createClaim);

router.put("/:id", upload.single("image"), updateClaim);

router.delete("/:id", deleteClaim);

export default router;
