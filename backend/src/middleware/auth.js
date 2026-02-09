import authService from '../services/authService.js';

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          message: 'No token provided'
        }
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const user = await authService.verifyToken(token);
    
    // Attach user to request
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Invalid or expired token'
      }
    });
  }
};

export default authenticate;
