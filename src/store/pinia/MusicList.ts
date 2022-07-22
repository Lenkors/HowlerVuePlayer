import { defineStore } from 'pinia';
import { $axios, apiList } from '../../api';
import {getAll} from './musicTypes'
export const useMusicList = defineStore('MusicList', {
    state: () => ({
        list: <getAll>[],
    }),
    actions: {

        getMusicList () {
            return new Promise((resolve, reject) => {
                $axios({
                    url: apiList.music.getAll.url,
                    method: apiList.music.getAll.method
                })
                .then(res => {
                    this.list = res.data.data
                    resolve(res.data)
                }).catch(err => reject(err));
            })
        },
        uploadMusic (payload:any) {
            return new Promise((resolve, reject) => {
                $axios({
                    url: apiList.music.upload.url,
                    method: apiList.music.upload.method,
                    data: payload
                }).then(res => {
                    console.log(res)
                    resolve(res.data)  
                }).catch(err => reject(err));
            });
        },
        uploadMusicFile ({payload, id}: {payload: any, id: string}) {
            return new Promise((resolve, reject) => {
                $axios({
                    url: apiList.music.uploadMusicFile.url+id,
                    method: apiList.music.uploadMusicFile.method,
                    data: payload
                })
                .then(res => {
                    console.log(res.data)
                    resolve(res.data)
                }).catch(err => reject(err));
            })
        }
    }
})