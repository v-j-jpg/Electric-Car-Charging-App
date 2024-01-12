# Electric car charging application

MERN tech stack : NodeJS, MongoDB, React 18.2.0 + NextJS 14.0 

App supports authentication via next-auth library and google api. There are two types of users: Admin and Client. 
Admin has the permission to use CRUD operations on the users and chargers. 
Client can connect to a free charger available on the nearest location. Locations of the chargers are implemented via @vis.gl/google-maps library.
