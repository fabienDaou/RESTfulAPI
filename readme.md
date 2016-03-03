#REST api

##Interface

```javascript
**_Get_ all dudes**
GET /dudes

**_Get_ a specific dude by id**
GET /dudes/:dudeid

**_Create_ a new dude**
POST /dudes/

**_Update_ a dude by id**
PATCH /dudes/:dudeid

**_Delete_ a dude by id**
DELETE /dudes/:dudeid

**_Get_ all versions linked to a dude**
GET /dudes/:dudeid/versions

**_Get_ a specific version linked to a dude**
GET /dudes/:dudeid/versions/:versionid

**_Create_ a new version linked to a dude**
POST /dudes/:dudeid/versions/

**_Get_ all hobbies linked to a dude**
GET /dudes/:dudeid/hobbies

**_Get_ all hobbies linked to a specific version**
GET /dudes/:dudeid/versions/:versionid/hobbies

**_Create_ a new hobby linked to a specific version**
POST /dudes/:dudeid/versions/:versionid/hobbies

**_Get_ all jobs linked to a dude**
GET /dudes/:dudeid/jobs

**_Get_ all jobs linked to a specific version**
GET /dudes/:dudeid/versions/:versionid/jobs

**_Create_ a new job linked to a specific version**
POST /dudes/:dudeid/versions/:versionid/jobs
```