import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { createError } from '../error.js';
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next)=>{
    try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
      ...req.body
    })
    await newUser.save();

    return res.status(201).json({
      message: 'User has been created.',
      error: false
    })
    }catch(e){
      next(e)
    }
}

export const signin = async (req, res, next)=>{
    try {
      const user = await User.findOne({email: req.body.email})
      if(!user) return next(createError(404, 'Not found.')) 

      const passwordComparision = await bcrypt.compare(req.body.password, user.password)
      if(!passwordComparision) return next(createError(400, 'Incorrect password.'))
      const token = jwt.sign({id: user._id}, '!mysecret')
      const {password, ...others} = user._doc

      res.cookie('access_token', token, { httpOnly : true}).status(200).json(others)
    }catch(e){
      next(e)
    }
}

export const googleAuth = async (req, res, next)=>{
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
       const token = jwt.sign({id: user._id}, '!mysecret')
       res.cookie('access_token', token, {
        httpOnly: true,
      }).status(200).json(user._doc)

    }else{
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, '!mysecret');
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  }catch(e){
    next(e)
  }
}