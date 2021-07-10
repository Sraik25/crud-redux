import { Dispatch } from 'react';
import { ACTIONTYPEALERT } from '../reducers/alertReducer';

export type initialAlert = {
  alertMessage: alertType | null;
};

export type alertType = {
  msg: string;
  classes: string;
};

export function showAlertAction(alert: any) {
  return (dispatch: Dispatch<any>) => {
    dispatch(createAlert(alert));
  };
}

const createAlert = (alert: any): ACTIONTYPEALERT => ({
  type: 'SHOW_ALERT',
  payload: alert,
});

export function hiddenAlertAction() {
  return (dispatch: Dispatch<any>) => {
    dispatch(hiddenAlert());
  };
}

const hiddenAlert = (): ACTIONTYPEALERT => ({
  type: 'HIDDEN_ALERT',
});
