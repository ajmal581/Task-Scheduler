import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';
import { IsEnum, IsNotEmpty, IsString , IsOptional, MinLength, IsEmail, Matches, MaxLength  } from 'class-validator';



  class UpdateUserDto {


  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, { message: 'Password must contain at least one special character' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  
  @IsOptional()
  @Matches(/^[A-Za-z]+$/, {message : 'Name can contain only letters'})
  name: string;
  
  }

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


     @UseGuards(JwtAuthGuard)
     @Get()
     getProfile(@Req() req: Request & { user: { userId: number } })
      {
      
        return this.usersService.findById(req.user.userId);
      }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProfile(@Req() req : Request & { user: { userId: number } }, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.userId, dto);
  }
    

}
