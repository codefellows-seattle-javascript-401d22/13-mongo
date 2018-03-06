# Garage with Mongo

## Models

- Garage `{name, datecreated}`

## Routes

- `GET: /api/garage/:garageId` returns the garage object associated with the garageId
- `POST: /api/garage` adds a new garage object to mongo with the provided parameters
- `PUT: /api/garage` updates garage object
- `DELETE: /api/garage/:garageId` deletes garage object associated with the garageId