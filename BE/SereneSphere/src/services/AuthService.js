import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const hashedPassword = '$2b$10$AsqQ6gmzB0oCozov7crlbO7m9Tf9aEYi2./tRYXyjKJJOpWfZ7LyG'; // Hashed password từ bước trước


export const Login = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        // console.log('email: '+email)
        // console.log('email: '+password)
        const user = await db.User.findOne({ where: { email: email } ,include:db.Role});

        if (!user) {
            resolve({
                user:LoginResponse(404, '', 'User not found')
            });
            return;
        }

        // So sánh mật khẩu được giải mã từ client với mật khẩu đã lưu trong cơ sở dữ liệu
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Mật khẩu khớp, đăng nhập thành công
            const roles = user.Roles.map(role => role.name);
            const token = 'Bearer '+jsonwebtoken(user.user_id,user.email,roles);
            const auth = AuthenticationResponse(user.fullname,user.user_id,user.avatar,token);
            const loginResponse = LoginResponse(200,auth,'Login successfully!');
            resolve({ message: 'Đăng nhập thành công', user: loginResponse });
        } else {
            // Mật khẩu không khớp, đăng nhập thất bại
            resolve({
                user:LoginResponse(401, '', 'Incorrect password')
            });
        }
    } catch (error) {
        reject(error)
        console.log("error in auth login: " + error)
    }
});
const jsonwebtoken =(id,email,role)=>{
    const token =jwt.sign({id:id,email:email,role},process.env.JWT_SECRET,{expiresIn:'7d'});
  return token;
}
const AuthenticationResponse = (name, id, avatar, token) => {
    const authenticationResponse = {
        name: name,
        id: id,
        avatar: avatar,
        token: token
    }
    return authenticationResponse;
}
const LoginResponse = (status, authenticationResponse, description) => {
    const loginResponse = {
        status: status,
        authenticationResponse: authenticationResponse,
        description: description
    }
    return loginResponse;

}