import { db } from '../lib/db';
import { hash, compare } from 'bcryptjs';

export interface AuthError extends Error {
  code?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  credits: number;
  isAdmin: boolean;
}

export async function login(email: string, password: string): Promise<User> {
  try {
    console.log('[AUTH] Attempting login for:', email);
    
    // For demo account, use hardcoded credentials
    if (email === 'demo@example.com' && password === 'password123') {
      // Get actual demo user from database
      const demoUser = await db.users.where('email').equals('demo@example.com').first();
      if (!demoUser) {
        // Create demo user if it doesn't exist
        const id = await db.users.add({
          name: 'مستخدم تجريبي',
          email: 'demo@example.com',
          password: '$2a$10$rDx2nayECs1Q85aNXwyxVu2NB9POZXXm1RvYvgZx.91n0.93.N9Ym', // password123
          avatar: 'م',
          isVerified: true,
          credits: 13,
          isAdmin: false,
          createdAt: new Date()
        });

        return {
          id,
          name: 'مستخدم تجريبي',
          email: 'demo@example.com',
          avatar: 'م',
          isVerified: true,
          credits: 13,
          isAdmin: false
        };
      }

      return {
        id: demoUser.id!,
        name: demoUser.name,
        email: demoUser.email,
        avatar: demoUser.avatar,
        isVerified: true,
        credits: demoUser.credits,
        isAdmin: false
      };
    }

    // For admin account
    if (email === 'admin@example.com' && password === 'admin123') {
      // Create or get admin user
      let adminUser = await db.users.where('email').equals('admin@example.com').first();
      
      if (!adminUser) {
        const id = await db.users.add({
          name: 'مدير النظام',
          email: 'admin@example.com',
          password: await hash('admin123', 10),
          avatar: 'م',
          isVerified: true,
          credits: 999,
          isAdmin: true,
          createdAt: new Date()
        });
        adminUser = await db.users.get(id);
      }

      if (!adminUser) throw new Error('Failed to create admin user');

      return {
        id: adminUser.id!,
        name: adminUser.name,
        email: adminUser.email,
        avatar: adminUser.avatar,
        isVerified: true,
        credits: adminUser.credits,
        isAdmin: true
      };
    }

    // For regular users
    const user = await db.users.where('email').equals(email).first();
    if (!user) {
      console.log('[AUTH] User not found:', email);
      const error = new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة') as AuthError;
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      console.log('[AUTH] Invalid password for:', email);
      const error = new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة') as AuthError;
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
      credits: user.credits,
      isAdmin: user.isAdmin || false
    };
  } catch (error) {
    console.error('[AUTH] Login failed:', error);
    throw error;
  }
}

export async function register(name: string, email: string, password: string): Promise<User> {
  try {
    console.log('[AUTH] Attempting registration for:', email);

    // Check if email exists
    const existingUser = await db.users.where('email').equals(email).first();
    if (existingUser) {
      console.log('[AUTH] Email already exists:', email);
      const error = new Error('البريد الإلكتروني مستخدم بالفعل') as AuthError;
      error.code = 'EMAIL_EXISTS';
      throw error;
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user with initial credits
    const id = await db.users.add({
      name,
      email,
      password: hashedPassword,
      avatar: name[0].toUpperCase(),
      isVerified: true,
      credits: 13,
      isAdmin: false,
      createdAt: new Date()
    });

    const user = await db.users.get(id);
    if (!user) {
      console.error('[AUTH] Failed to create user:', email);
      const error = new Error('فشل في إنشاء المستخدم') as AuthError;
      error.code = 'CREATE_FAILED';
      throw error;
    }

    console.log('[AUTH] Registration successful for:', email);

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isVerified: true,
      credits: user.credits,
      isAdmin: false
    };
  } catch (error) {
    console.error('[AUTH] Registration failed:', error);
    throw error;
  }
}

export async function updateProfile(userId: number, data: {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<User> {
  try {
    const user = await db.users.get(userId);
    if (!user) {
      throw new Error('المستخدم غير موجود');
    }

    // Validate email uniqueness if changing email
    if (data.email && data.email !== user.email) {
      const existingUser = await db.users.where('email').equals(data.email).first();
      if (existingUser) {
        throw new Error('البريد الإلكتروني مستخدم بالفعل');
      }
    }

    // Verify current password if changing password
    if (data.currentPassword && data.newPassword) {
      const isValidPassword = await compare(data.currentPassword, user.password);
      if (!isValidPassword) {
        throw new Error('كلمة المرور الحالية غير صحيحة');
      }
      data.password = await hash(data.newPassword, 10);
    }

    // Update user
    await db.users.update(userId, {
      name: data.name || user.name,
      email: data.email || user.email,
      password: data.password || user.password,
      updatedAt: new Date()
    });

    return {
      id: userId,
      name: data.name || user.name,
      email: data.email || user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
      credits: user.credits,
      isAdmin: user.isAdmin || false
    };
  } catch (error) {
    console.error('[AUTH] Profile update error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}