import { requireAuth } from '@clerk/clerk-sdk-node';

export const authRequired = async (req, res, next) => {
  try {
    await requireAuth()(req, res, next);
    console.log("Autenticación exitosa:", req.auth);
  } catch (err) {
    console.error('Error en la autenticación:', err);
    return res.status(401).json({ message: "No autorizado" });
  }
};
