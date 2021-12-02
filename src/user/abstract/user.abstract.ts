import { SECRET } from "../../config";
import { UserEntity } from "../user.entity";
import { UserRO } from "../user.interface";
const jwt = require("jsonwebtoken");

export class UserAbstract {

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 30);
    
        return jwt.sign({
          id: user.identifier,
          username: user.username,
          exp: exp.getTime() / 1000,
        }, SECRET);
    };

    public getUserFromToken(token: string): UserEntity {
        return jwt.verify(token, SECRET);
    }
    
    protected buildUserRO(user: UserEntity): UserRO {
        const userRO = {
            username: user.username,
            profilePicture: user.profilePicture,
            token: this.generateJWT(user),
            firstName: user.firstName,
            lastName: user.lastName,
        };
    
        return { user: userRO, status: "SUCCESS" };
    }
}
