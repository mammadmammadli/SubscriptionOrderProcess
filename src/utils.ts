import { IAsync } from "./models";

export const isSuccess = (branch: IAsync<any>) => branch.status === "SUCCESS";
export const isPending = (branch: IAsync<any>) => branch.status === "PENDING";
export const isError = (branch: IAsync<any>) => branch.status === "ERROR";
export const isIdle = (branch: IAsync<any>) => branch.status === "IDLE";