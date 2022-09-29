import config from "config";

export default function (req, res, next) {
  if (!config.get("requiresAuth")) next();

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}
