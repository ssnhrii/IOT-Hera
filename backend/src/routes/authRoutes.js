import express from 'express';
import authService from '../services/authService.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Email and password are required'
        }
      });
    }

    // Login
    const result = await authService.login(email, password);

    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid credentials' || error.message === 'Account is inactive') {
      return res.status(401).json({
        error: {
          message: error.message
        }
      });
    }

    res.status(500).json({
      error: {
        message: 'Internal server error'
      }
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout (client-side token removal)
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Token invalidation is handled client-side
    res.json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error'
      }
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user information
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error'
      }
    });
  }
});

export default router;
