import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Service
 * Handles user authentication, token generation, and password management
 */
class AuthService {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{token: string, user: Object}>}
   */
  async login(email, password) {
    // Find user by email
    const user = await User.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is inactive');
    }

    // Compare password
    const isPasswordValid = await this.comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = this.generateToken(user);

    // Return token and user data (without password)
    return {
      token,
      user: user.toPublicJSON()
    };
  }

  /**
   * Verify JWT token and return user
   * @param {string} token - JWT token
   * @returns {Promise<Object>} User object
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');
      
      const user = await User.findByPk(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new Error('Invalid token');
      }

      return user.toPublicJSON();
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Hash password
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare password with hash
   * @param {string} password - Plain text password
   * @param {string} hash - Hashed password
   * @returns {Promise<boolean>}
   */
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  generateToken(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

    return jwt.sign(payload, secret, { expiresIn });
  }
}

export default new AuthService();
