import { createAsyncAction } from "typesafe-actions";

/*
 * GET CUSTOMERS
 */

export const getBankUser = createAsyncAction(
  "user/GET_REQUEST",
  "user/GET_SUCCESS",
  "user/GET_FAILURE"
)<void, string, Error>();