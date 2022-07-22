import { PlayerState, RootState  } from '../types';
import { ActionTree } from 'vuex';
import { MusicItem } from '../../pinia/musicTypes';

export const actions: ActionTree<PlayerState, RootState> = {
    setSelectedTrack ({commit}, {index, data}:{index:number, data: MusicItem}):void {
        commit('setValueSelectedTrack', {index, data});
    }
}