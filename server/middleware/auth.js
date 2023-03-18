import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next) => {
    const token=req.header("Authorization");
    if (!token) {
        return res.status(403).send("Acces denied.")
    }
    else if (token.startsWith("Bearer ")) {
        token=token.slice(7,token.length).trimLeft();
    }
    const verified=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    req.user=verified;
    next();
}