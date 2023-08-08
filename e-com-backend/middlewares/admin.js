//call after authorize middleware because req.user cannot access without authorize middleware
module.exports = async function (req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).send("Access Forbidden");
    }
    next();
}