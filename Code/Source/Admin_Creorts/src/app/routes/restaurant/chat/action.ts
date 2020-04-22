// counter.ts
import {ActionReducer, Action} from '@ngrx/store';
import {ChatService} from './chat.service';

export function chatData(state: string = 'hello', action: Action) {
  console.log(action.type)
  return action.type;
}
