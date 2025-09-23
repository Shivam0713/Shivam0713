import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/types';

const router = Router();

// Sample users data (in production, this would be in a database)
const users: User[] = [
  {
    id: '1',
    email: 'admin@monastery360.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// For demo purposes, we'll store passwords in memory (use proper DB in production)
const userCredentials: { [email: string]: string } = {
  'admin@monastery360.com': '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'admin123'
  'researcher@monastery360.com': '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'research123'
  'tourist@monastery360.com': '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: 'tourist123'
};

const JWT_SECRET = process.env.JWT_SECRET || 'monastery360-secret-key';

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    const hashedPassword = userCredentials[email];

    if (!user || !hashedPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role = 'tourist' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and name are required'
      });
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      name,
      role: role as 'admin' | 'researcher' | 'tourist',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    userCredentials[email] = hashedPassword;

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

// GET /api/auth/profile
router.get('/profile', verifyToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile'
    });
  }
});

// Middleware to verify JWT token
function verifyToken(req: Request, res: Response, next: any) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid token.'
    });
  }
}

export default router;