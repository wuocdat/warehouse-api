import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = JSON.parse(JSON.stringify(user));
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
