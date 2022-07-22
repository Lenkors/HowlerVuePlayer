import axios from 'axios'

const $axios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL
})

const apiList = {
    music: {
        getAll: {
            method: 'GET',
            url: '/get/all/musics/'
        },
        upload: {
            method: 'POST',
            url: '/upload/music/'
        },
        uploadMusicFile: {
            method: 'POST',
            url: '/upload/music/file/'
        },
        delete: {
            method: 'DELETE',
            url: '/delete/music/'    
        }
    }
}

export {$axios, apiList} 