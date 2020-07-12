import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { UserReducer } from "./user";

// Configure Redux store & reducers
export const rootReducer = combineReducers({
    user: UserReducer,
});

export * from "./user";

export type IStore = StateType<typeof rootReducer>;
