import { ActionType, getType } from "typesafe-actions";

import * as actions from "@actions/UserActions";

/**
 * INITIAL_STATE
 */
export interface IUserState {
  readonly error?: Error;
  readonly isFetching: boolean;

  readonly user?: string;
}

export const initialUserState: IUserState = {
  error: undefined,
  isFetching: false,

  user: undefined
};

/**
 * REDUCER
 */
export const UserReducer = (
  state: IUserState = initialUserState,
  action: ActionType<typeof actions>
): IUserState => {
  switch (action.type) {
    case getType(actions.getBankUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.getBankUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: action.payload
      };
    case getType(actions.getBankUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};