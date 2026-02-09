import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';

const createDefaultUser = async () => {
  try {
    console.log('🌱 Starting user seeder...\n');
    
    // Connect to database
    await connectDatabase();
    
    // Check if user already exists
    const existingUser = await User.findByEmail('petugas@hera.go.id');
    if (existingUser) {
      console.log('✓ User petugas@hera.go.id already exists');
      await disconnectDatabase();
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('petugas123', 10);
    
    // Create petugas user
    const petugasUser = await User.create({
      email: 'petugas@hera.go.id',
      password: hashedPassword,
      name: 'Petugas SAR',
      role: 'petugas',
      isActive: true
    });
    
    console.log('✓ Petugas user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: petugas@hera.go.id');
    console.log('   Password: petugas123');
    console.log('   Role: petugas\n');
    
    console.log('🎉 Seeding completed!\n');
    
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

createDefaultUser();
