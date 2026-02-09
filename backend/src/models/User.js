import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * User Model
 * Defines the structure for user accounts in the HERA system
 * Supports two roles: 'petugas' (officers) and 'admin'
 * 
 * Requirements:
 * - 1.1: User authentication with credentials
 * - 1.2: Credential validation
 * - 1.5: Password hashing and storage
 */
class User extends Model {
  /**
   * Get user's public profile (excludes sensitive data)
   * @returns {Object} Public user data
   */
  toPublicJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      isActive: this.isActive,
      lastLogin: this.lastLogin,
      createdAt: this.createdAt
    };
  }

  /**
   * Find user by email
   * @param {String} email - User email address
   * @returns {Promise<User>} User instance
   */
  static async findByEmail(email) {
    return await this.findOne({ where: { email: email.toLowerCase() } });
  }

  /**
   * Find active users by role
   * @param {String} role - User role ('petugas' or 'admin')
   * @returns {Promise<Array>} Array of user instances
   */
  static async findActiveByRole(role) {
    return await this.findAll({
      where: {
        role,
        isActive: true
      }
    });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Email address already in use'
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required'
      },
      len: {
        args: [8, 255],
        msg: 'Password must be at least 8 characters long'
      }
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    },
    set(value) {
      this.setDataValue('name', value.trim());
    }
  },
  role: {
    type: DataTypes.ENUM('petugas', 'admin'),
    defaultValue: 'petugas',
    validate: {
      isIn: {
        args: [['petugas', 'admin']],
        msg: 'Role must be either petugas or admin'
      }
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['is_active', 'role']
    }
  ]
});

export default User;
