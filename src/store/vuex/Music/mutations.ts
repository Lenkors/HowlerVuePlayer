import { MutationTree } from 'vuex';
import { PlayerState } from '../types';

export const mutations: MutationTree<PlayerState> = {
    setValueSelectedTrack(state, payload:any):any {
        state.selectedTrack = {...payload};
    }
}