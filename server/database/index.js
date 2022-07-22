const database = (DB) => {
    return new Promise((resolve, reject) => {
        DB.connect('mongodb://localhost:27017/', (err, client) => {
            if (err) console.error(`DB connect: ${err}`), reject(err);
            else {
                console.log('DB connect successful');
                const dtb = client.db('music-db-back') 
                resolve(dtb);
            }
        });
    })    
}

export { database }