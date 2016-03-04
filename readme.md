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
##Definition of HATEOAS
* The model of application is an engine that moves from one state to another by picking alternative state transitions in current set of representations.

##Why HATEOAS is useful?
* Self documented API.
* No worries about access permissions client-side: work is done server-side.
* It is not up to the user to know what to do next in a "business process", links are there to guide the user.
* No out-of-band documentation, I still think an out of band is useful for developers to have an overview of the system.
* API can change (links especially) without breaking every client-side application.

##When to use HATEOAS?
* When a company wants to invest into a long term solution that needs to be robust to changes.
* When you want loose coupling between client & server, allowing each to evolve independently.
* When you want to avoid maintenance of client apps.
* When you do not want to be yelled at by Roy Fielding.

Basically if you want that any changes in the API does not change anything for the client.

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