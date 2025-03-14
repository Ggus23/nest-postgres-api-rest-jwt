import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,  // Cambiar "jwtServie" a "jwtService"
  ) {}
  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }
    await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
    return {
      name, 
      email,
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWhithPassword(email);

  if (!user) {
     throw new UnauthorizedException('Email is wrong');
  }

  if (!user.password) {  // Verifica que la contraseña exista
    throw new UnauthorizedException('No password found for this user');
  }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Password is wrong');
  }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email,
    };
  }
  async profile ({email, role}: {email: string, role: string}) {

    /*if(role !== 'admin'){
      throw new UnauthorizedException('You are not authorized to access this resource');
    }*/
    return await this.usersService.findOneByEmail(email);
  }
}
