import { Request } from "express";
import { UserPayload } from "./userPayload.interface";

export interface UserRequest extends Request{
    user: UserPayload;
}