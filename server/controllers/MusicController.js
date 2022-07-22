class Music {
    getAllMusic ({db}) {
        return new Promise(async (resolve, reject) => {
            const music = await db.collection('music-list').find();
            let arr = [];
            await music.forEach(el => arr.push(el));
            if (arr.length) resolve({'data': arr});
            else reject({'error': 'No music found'});
        })
    }
    
    uploadMusic ({db, music}) {
        return new Promise((resolve, reject) => {
            db.collection('music-list').insertOne(music, (err, result) => {
                if (err) reject({'error': err});
                else resolve({'success': true, 'data': result});
            })
        })
    }

    deleteMusic({db, id}) {
        return new Promise((resolve, reject) => {
            db.collection('music-list').deleteOne({"_id": id}, (err, result) => {
                if (err) reject({'error': err});
                else resolve({"msg": 'Трек удален', "data": result});
            })
        })
    }

    setMusicFile({db, file, id}) {
        return new Promise((resolve, reject) => {
            db.collection('music-list').updateOne({"_id": id}, {
                $set: {
                    music: `/files/${file.filename}`
                }
            })
            resolve(true)
        })
    }
}

export { Music }