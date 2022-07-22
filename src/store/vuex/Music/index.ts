import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PlayerState, RootState } from '../types';

export const state: PlayerState = {
  selectedTrack: false,
  isPause: true
};

// const namespaced: boolean = true;

export const player: Module<PlayerState, RootState> = {
  // namespaced,
  state,
  getters,
  actions,
  mutations
};