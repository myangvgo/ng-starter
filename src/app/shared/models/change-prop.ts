import { ActionType } from './action-type';

export interface ChangeProp {
  Action: ActionType;
  Prop: string;
  PropValue: any;
  PropOldValue: any;
}
