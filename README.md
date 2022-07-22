# Vue 3 + TypeScript + Vite - Music Player
For the test I want to show the work with two different storage packages -  classic `Vuex` and newbie `Pinia`. **Just for the experiment!**


- As Music Player lib use [Howler.js](https://github.com/goldfire/howler.js).

## SETUP
- You two way to setup this.

First way: Docker way.
- in root folder run command `docker-compose up -d`

Second way: Local
- in root run `npm install` (packages for Vue ___client___) and then run command `npm run preview` (if you wand preview mode) OR run `npm run build` to build dist folder for your web server 
- go to the server folder from root `cd server`
- in server folder run command `npm install` (packages for express),then  run command `npm run serve`
- next step its up [Mongo server](https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/) (or you can just up mongo from docker)
- run in serve folder `npm run migrate:up` (start migration in mongo)