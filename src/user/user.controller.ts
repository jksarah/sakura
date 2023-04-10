import UserService from "./user.service";
import * as express from "express";

class Usercontroller {
  public router = express.Router();
  constructor() {
    this.initRoutes()
  }
  service = new UserService();

  initRoutes() {
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
  }

  public async register(req: express.Request, res: express.Response) {
    try {
      console.log("incoming request to register a user");
      const user = await this.service.insert(req.body);
      res.json({ result:user, message: "user registered successfully" });
    } catch (error) {
      res.json({ error, message: "failed to register user" });
    }
  }
  public async login (req: express.Request,res: express.Response){
    try {
      console.log("incoming request to login a user");
      const result = await this.service.userauth(req.body)
      res.json({result, message:"logged in successfully"});
    } catch(error) {
      res.json({error,message:"login not successful"});
    }
  }

  public async getCurrentUserDetails(req: express.Request &{user: any},res: express.Response){
    try {
      console.log("incoming request to get user details");
      const result = await this.service.getCurrentUserDetails(req.user)
      res.json({result, message:"logged in successfully"});
    } catch(error) {
      res.json({error,message:"login not successful"});
    }
  }
}

export default new Usercontroller().router
