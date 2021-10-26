# basketball_statistics
A website for a basketball team to record the data realtime and to analyze after a game.

# Deploy
checkout to deploy branch
```shell=
npm run build 
npm run start
```

# Develop
Other than deploy branch
```shell=
# Run the following two commands in two terminal
npm run start
npm run server
```

# Structure
backend: for the backend api
├── controllers: the function for each route
├── models: db table model
├── routes: wrap the route and the function
└── services: the operation for each model

