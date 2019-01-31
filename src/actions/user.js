import * as UserActionTypes from "../actiontypes/user";

export const addUserTag = (name, index, data) => {
  return {
    type: UserActionTypes.ADD_USER_TAG,
    name,
    index,
    data
  };
};
