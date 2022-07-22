export const up = async (db, client) => {
    const session = client.startSession();
    await db.createCollection('music-list', {
        autoIndexId: true
    })
    try {
        await session.withTransaction(async () => {
            await db.collection('music-list').insertOne({artist: 'Ace Hood', songName: 'We Ball', music: '/files/Ace-Hood - We Ball.mp3', time: '03:20:00', album: 'Mr. Hood', howl: false});
            await db.collection('music-list').insertOne({artist: 'MVDNES', songName: 'Japan Street', music: '/files/1648803250_mvdnes-japan-street.mp3', time: '02:04:00', album: '', howl: false});
        });
    } finally {
      await session.endSession();
    }
};

export const down = async (db, client) => {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
};
