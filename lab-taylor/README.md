# Mongo API

This is a simple, single-resource API that utilizes express and MongoDb. It's resource is ```beers```. You can perform CRUD functions against it.

### Dependencies

  ```npm i``` will download the dependecny needed for this app.

  - ```bluebird```
  - ```body-parser```
  - ```cors```
  - ```debug```
  - ```express```
  - ```http-errors```
  - ```mongoose```
  - ```morgan```
  - ```eslint```
  - ```jest```
  - ```superagent```

### Resources

#### Beer

The beer resource has several properties...
```
{
  name: < Beer name >,
  style: < Style of beer >,
  breweryID: < ID of brewery, added at time of POST >,
}
```



### Routes

#### **POST** 

*Beer*
```
localhost:3000/api/brewery/<breweryId>/beer
``` 
with a request body of ...
```
{
  name: < beername >,
  style: < beerstyle >,
}
```


#### **GET**

*Beer*
```
localhost:3000/api/beer/<beerId>
```



#### **PUT**

*Beer*
```
localhost:3000/api/beer/<beerId>
```



#### **DELETE**

*Beer*
```
localhost:3000/api/beer/<beerId>
```



