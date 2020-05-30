const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const model = require('../models/index')
const user = model.User
const resp = require('../config/httpResponse')
const bcrypt = require('bcryptjs')

module.exports = {
    signIn: async (req,res) => {

        try {
            const { email, password} = req.body

            const check = await user.findOne({
                where: {
                    email
                }
            })

            if (!check) {                
                return resp.validationError(res,'invalid credentials', 401)
            }

            await bcrypt.compare(password, check.password, async (err, result) => {
                if (!result) {
                    return resp.validationError(res,'invalid credentials', 401)
                }

                const token = await jwt.sign(
                    {
                        id: check.id,
                        name: check.name,
                        email: check.email,
                    },
                    process.env.JWTKEY
                )
    
                return resp.success(res,{token})
            })

        } catch (err) {
            return resp.error(res, err)
        }
    },

    signUp: async (req, res) => {
        try {
            let { email,name,password } = req.body

            const salt = await bcrypt.genSalt(10);
            
            password = await bcrypt.hash(password, salt)
            
            let data = new user({email, name, password})
            
            await data.save()

            if(!data){
                return resp.validationError(res, err.message)
            }

            return resp.success(res, data)

        } catch (err) {
            return resp.error(res, err.message)
        }
    },

    profile: (req, res) => {
        const data = req.user

        return resp.success(res, data)
    }
}