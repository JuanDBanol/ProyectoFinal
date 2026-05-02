const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const token = authHeader.replace("Bearer ", "");
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};