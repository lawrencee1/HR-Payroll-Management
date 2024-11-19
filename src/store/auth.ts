import { create } from 'zustand';
import { AuthState, Role, User } from '../types/auth';

// Simulated user database (in a real app, this would be on the backend)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as Role,
  },
  {
    id: '2',
    email: 'hr@company.com',
    password: 'hr123',
    name: 'HR Manager',
    role: 'hr_manager' as Role,
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  register: async (email: string, password: string, name: string, role: Role) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (MOCK_USERS.some((u) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
      role,
    };

    MOCK_USERS.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));