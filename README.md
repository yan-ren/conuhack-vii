## Setup Instruction

#### Install Docker

#### Run mongodb using docker container
```
docker run -d -p 27017:27017 --name test-mongo mongo:latest
```

####  Run Backend server
```
cd backend
npm install
node index.js
```

#### Run Frontend server
```
cd frontend
npm install
npm start
```
