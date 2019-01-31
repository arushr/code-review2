import * as UserActionTypes from "../actiontypes/user";

const initialState = [
  {
    name: null,
    currentIndex: -1,
    email: "",
    company: "",
    lastName: "",
    firstName: "",
    pic: "",
    grades: [],
    skill: ""
  }
];

export default function Player(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.ADD_USER_TAG:
      return [
        ...state,
        {
          name: action.name,
          currentIndex: action.index,
          email: action.data.email,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          company: action.data.company,
          pic: action.data.pic,
          grades: action.data.grades,
          skill: action.data.skill
        }
      ];

    default:
      return state;
  }
}
