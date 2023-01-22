## Setup Instruction

#### Install Docker

#### Run mongodb using docker container
```
docker pull mongo:latest


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
npm install --legacy-peer-deps
npm start
```
## System diagram

![04cd6c2718e4c56ee6b1242aa37487a](https://user-images.githubusercontent.com/49465578/213904360-e4d4c703-6404-49d6-9548-7d6cbb41e0e4.png)
