import { createStore } from 'vuex'
import { RootState } from './types';
import { player } from './Music/index';

export const store = createStore<RootState>({
    state: {
        version: '0.0.1'
    },
    modules: {
        player
    }
})