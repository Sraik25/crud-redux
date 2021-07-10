import { initialAlert } from '../actions/alertActions';

const initialState: initialAlert = {
  alertMessage: null,
} as const;

export type ACTIONTYPEALERT =
  | { type: 'SHOW_ALERT'; payload: any }
  | { type: 'HIDDEN_ALERT' };

const alertReducer = (
  state = initialState,
  action: ACTIONTYPEALERT
): typeof initialState => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        alertMessage: action.payload,
      };

    case 'HIDDEN_ALERT':
      return {
        ...state,
        alertMessage: null,
      };

    default:
      return state;
  }
};

export default alertReducer;
