import { check } from 'express-validator';
import { RequestHandler } from 'express';

export const validSignup: RequestHandler[] = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password', 'Password is required').notEmpty(),
  check('password')
  .trim()
  .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

export const validLogin: RequestHandler[] = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password', 'Password is required').notEmpty(),
  check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

export const forgotPasswordValidator: RequestHandler[] = [
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];


export const resetPasswordValidator: RequestHandler[] = [
  check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
];