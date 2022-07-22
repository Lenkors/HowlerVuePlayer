export interface getAll extends Array<MusicItem> {}

export interface MusicItem {
    _id: string,
    artist: string,
    path: string,
    music: string,
    time: string,
    album: string,
    howl?: boolean | any,
    index?: number
}