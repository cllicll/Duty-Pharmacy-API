# GraphQL and REST - Node JS API

A simple Node.JS server for exposing a GraphQL and REST API of Duty Pharmacy on Turkey

Rest API Demo: http://dutypharmacyapi.herokuapp.com/get/kayseri/talas

## Run

First you'll need a TMDb API key you should get that key on [here](https://developers.themoviedb.org/3)

Then:

1.  `git clone` this repo
2.  `cd duty-pharmacy-api`
3.  `npm install`
5.  `npm start`

### GraphQL
This will start the GraphQL server at `http://localhost:4000/` with the GraphQL endpoint at `/graphql` 

### REST

|  | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /get/{city} | Lists all pharmacies on duty in the city |
| GET | /get/{city}/{town} | Lists all pharmacies on duty in the town |
