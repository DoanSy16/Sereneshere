import db from '../models';
import bcrypt from 'bcrypt';
const hashedPassword = '$2b$10$AsqQ6gmzB0oCozov7crlbO7m9Tf9aEYi2./tRYXyjKJJOpWfZ7LyG'; // Hashed password từ bước trước
export const findAllUser = () => new Promise(async (resolve, reject) => {
  try {
    const response = await db.User.findAll()
    resolve(response)
  } catch (error) {
    reject(error)
    console.log(error)
  }
});

