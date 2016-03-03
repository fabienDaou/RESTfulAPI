#REST api

##Interface

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
**_Get_ all versions linked to a dude**
```javascript
GET /dudes/:dudeid/versions
```
**_Get_ a specific version linked to a dude**
```javascript
GET /dudes/:dudeid/versions/:versionid
```
**_Create_ a new version linked to a dude**
```javascript
POST /dudes/:dudeid/versions/
```
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