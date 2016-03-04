#REST api

##How to install
````
npm install
````
##How to use
````
node src/init 
````
Create a job under version 2 of his profile, dude with id 1
```javascript
$.ajax({
    type: 'POST',
    url: "http://localhost:5000/rest/dudes/1/versions/2/jobs",
    data: JSON.stringify({jobTitle:"snoozer"}),
    contentType: 'application/json; charset=utf-8'
}).then(function(res) {
    console.log("Successfully added!");
}).fail(function(error){
    console.log(error);
});
```

##Interface
###Dudes
**_Get_ all dudes**
```javascript
GET /dudes
```
**_Get_ a specific dude by id**
```javascript
GET /dudes/:dudeid
```
**_Create_ a new dude**
```javascript
POST /dudes/
```
**_Update_ a dude by id**
```javascript
PATCH /dudes/:dudeid
```
**_Delete_ a dude by id**
```javascript
DELETE /dudes/:dudeid
```
###Versions
**_Get_ all versions linked to a dude**
```javascript
GET /dudes/:dudeid/versions
```
**_Create_ a new version linked to a dude**
```javascript
POST /dudes/:dudeid/versions/
```
###Hobbies
**_Get_ all hobbies linked to a dude**
```javascript
GET /dudes/:dudeid/hobbies
```
**_Get_ all hobbies linked to a specific version**
```javascript
GET /dudes/:dudeid/versions/:versionid/hobbies
```
**_Create_ a new hobby linked to a specific version**
```javascript
POST /dudes/:dudeid/versions/:versionid/hobbies
```
###Jobs
**_Get_ all jobs linked to a dude**
```javascript
GET /dudes/:dudeid/jobs
```
**_Get_ all jobs linked to a specific version**
```javascript
GET /dudes/:dudeid/versions/:versionid/jobs
```
**_Create_ a new job linked to a specific version**
```javascript
POST /dudes/:dudeid/versions/:versionid/jobs
```