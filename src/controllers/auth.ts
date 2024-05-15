import { Request, Response } from 'express';
import { getChefByUsername } from '../services/chef';
import { getFoodieByUsername } from '../services/foodie';
import { login } from '../services/auth';
import { loginSchema } from '../utils/payloadValidation';
import Boom from '@hapi/boom';

interface customRequest extends Request {
    userType: string;
}

interface customResponse extends Response {
    token: string;
}


async function handleLogin(req: customRequest, res: customResponse) {
    let userName: string = '';
    let password: string = '';;
    
    if ((req.body !== null && req.body !== undefined) && ('userName' in req.body && 'password' in req.body)) {
        userName = req.body.userName as string;
        password = req.body.password as string;
}

    const { error } = loginSchema.validate(req.body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    if(req.userType == 'chef' ){
        var user = await getChefByUsername(userName);
        await login(user,userName,password,res,"chef"); 
    } else {
        var user = await getFoodieByUsername(userName);
        await login(user,userName,password,res,"foodie"); 
    }

    

    return res.json({ "status": "successfully Logged In", "token": res.token });

};

export {
    handleLogin
};