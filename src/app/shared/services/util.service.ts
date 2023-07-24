import { Injectable } from '@angular/core';
import { ChangeProp } from '../models/change-prop';
import { ActionType } from '../models/action-type';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public getObjectChanges(
    newObj: any,
    oldObj: any,
    excludeProps: string[] = []
  ) {
    const changeProps: ChangeProp[] = [];

    const propsOfNewObj = Object.keys(newObj);
    const propsOfOldObj = Object.keys(oldObj);
    const props = [...new Set([...propsOfNewObj, ...propsOfOldObj])];
    const propsOfChangeList = props.filter((f) => !excludeProps.includes(f));

    propsOfChangeList.forEach((keyName) => {
      let keyValue = newObj[keyName];
      const oldValue = oldObj[keyName];
      const action = this.getActionType(keyValue, oldValue);
      if (action && action !== ActionType.NONE) {
        changeProps.push({
          Action: action,
          Prop: keyName,
          PropValue: keyValue,
          PropOldValue: oldValue,
        });
      }
    });

    return changeProps;
  }

  public getArrayChanges(newArr: any[], oldArr: any[], keyProp: string) {
    const newKeyFieldValueArr = (newArr || []).map((item) => item[keyProp]);
    const oldKeyFieldValueArr = (oldArr || []).map((item) => item[keyProp]);
    const newKeyFieldValueSet = new Set(newKeyFieldValueArr);
    const oldKeyFieldValueSet = new Set(oldKeyFieldValueArr);
    const props = [
      ...new Set([...newKeyFieldValueSet, ...oldKeyFieldValueSet]),
    ];

    const insertArr = [...newKeyFieldValueSet].filter(
      (v) => !oldKeyFieldValueSet.has(v)
    );
    const deleteArr = [...oldKeyFieldValueSet].filter(
      (v) => !newKeyFieldValueSet.has(v)
    );
    const updateArr = props.filter(
      (v) => ![...insertArr, ...deleteArr].includes(v)
    );
  }

  private getActionType(comparisonValue: any, comparisonOldValue: any) {
    let action: ActionType = ActionType.NONE;

    if (comparisonValue && comparisonOldValue) {
      if (comparisonValue !== comparisonOldValue) {
        action = ActionType.UPDATE;
      }
    } else if (comparisonValue && !comparisonOldValue) {
      action = ActionType.ADD;
    } else if (!comparisonValue && comparisonOldValue) {
      action = ActionType.DELETE;
    }

    return action;
  }
}
