import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, { message: 'Password must contain at least one special character' })
  password: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, {message : 'Name can contain only letters'})
  name: string;


  
}

 export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}