import {Music} from "../controllers/MusicController.js"
import {ObjectID} from "mongodb";
import {upload} from "../multer/index.js";

const MusicController = new Music();

const router = (app, db) => {
    
    /**
     * Music routes
     */

    app.get('/get/all/musics', (req, res) => {
        MusicController.getAllMusic({db: db})
            .then(result => res.send(result))
            .catch(err => res.status(400).send(err))
    })

    app.delete('/delete/music/:id', (req, res) => {
        MusicController.deleteMusic({db: db, id: new ObjectID(req.params.id)})
            .then(result => res.send(result))
            .catch(err => res.status(400).send(err))
    })

    app.post('/upload/music', (req, res) => {
        MusicController.uploadMusic({db: db, music: req.body})
            .then(result => res.send(result))
            .catch(err => res.status(400).send(err))
    })

    app.post('/upload/music/file/:id', upload.single('music'), (req, res) => {
        MusicController.setMusicFile({db: db, id: new ObjectID(req.params.id), file: req.file})
            .then(result => res.send(result))
            .catch(err => res.status(400).send(err))
    })
}

export { router }
