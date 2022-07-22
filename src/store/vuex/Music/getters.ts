import { GetterTree } from 'vuex';
import { PlayerState } from '../types';
import { RootState } from '../types';

export const getters: GetterTree<PlayerState, RootState> = {
  musicPlayerItem(state) {
    return {
        track: state.selectedTrack,
        isPause: state.isPause
    }
  }
};