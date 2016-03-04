var Sequelize = require('sequelize'),
    Sqlite = require('sqlite3').verbose(),
    Promise = require('promise');


this.seqConn = null;



this.createVolatileDB = function() {
    return new Sqlite.Database(":memory:", {}, (err) => {
        console.log(err);
    });
}

this.connect = function() {
    this.seqConn = new Sequelize('raptor', '', '', {
        dialect: 'sqlite',
        storate: ':memory:'
    });
}

this.initSchema = function() {
    this.seqConn.define('Dude', {
        DudeID : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        Fullname : Sequelize.STRING,
        Phone : Sequelize.STRING,
        Email : Sequelize.STRING
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    this.seqConn.define('DudeProfileVersion', {
        VersionID: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        DudeID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Dude',
                key: 'DudeID'
            }
        },
        Date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        freezeTableName: true
    });

    this.seqConn.define('DudeHobbiesUpdate', {
        UpdateID: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        VersionID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'DudeProfileVersion',
                key: 'VersionID'
            }
        },
        DudeID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Dude',
                key: 'DudeID'
            }
        },
        HobbyTitle: Sequelize.STRING
    },
    {
        freezeTableName: true
    });

    this.seqConn.define('DudeJobsUpdate', {
        UpdateID: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        VersionID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'DudeProfileVersion',
                key: 'VersionID'
            }
        },
        DudeID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Dude',
                key: 'DudeID'
            }
        },
        JobTitle: Sequelize.STRING,
        Company: Sequelize.STRING,
        Location: Sequelize.STRING
    },
    {
        freezeTableName: true
    });

}

// Retrieve dude, dudes, all dudes
// optional mode = {mode:'ALL'}
// return a promise
this.getDudes = function(arrayids, mode) {
    if(mode && mode.mode === 'ALL'){
        return this.seqConn.models.Dude.findAll({
            attributes: ['DudeID', 'Fullname', 'Phone', 'Email']
        });
    }

    return this.seqConn.models.Dude.findAll({
        where: {
            DudeID: arrayids
        },
        attributes: ['DudeID', 'Fullname', 'Phone', 'Email']
    });
}

this.addDude = function(dude) {
    return this.seqConn.models.Dude.create({
        Fullname: dude.fullname,
        Phone: dude.phone,
        Email: dude.email
    });
}

this.updateDude = function(dude) {
    return this.seqConn.models.Dude.update(dude, {where: {DudeID: dude.DudeID}});
}

this.deleteDude = function(arrayids) {
    var promises = [];
    for (var i = arrayids.length - 1; i >= 0; i--) {
        var promise = this.seqConn.models.Dude
            .destroy({ 
                where: { 
                    DudeID: arrayids[i] 
                }
            });
        promises.push(promise);
    }
    return Promise.all(promises);
}

this.getVersions = function(id) {
    return this.seqConn.models.DudeProfileVersion.findAll({
        where: {
            DudeID: id
        },
        attributes: ['VersionID', 'DudeID', 'Date']
    });
}

this.addVersion = function(profile) {
    return profile.date ?   this.seqConn.models.DudeProfileVersion.create({DudeID: profile.dudeID, Date: profile.date}) :
                            this.seqConn.models.DudeProfileVersion.create({DudeID: profile.dudeID});
}

this.getHobby = function(dudeid, versionid) {
    return  versionid ?  
            this.seqConn.models.DudeHobbiesUpdate.findAll({
                where: {
                    DudeID: dudeid,
                    VersionID: versionid
                }
            }) :
            this.seqConn.models.DudeHobbiesUpdate.findAll({
                where: {
                    DudeID: dudeid
                }
            });
}

this.addHobby = function(hobby) {
    return this.seqConn.models.DudeHobbiesUpdate.create({
        VersionID: hobby.versionID, 
        DudeID: hobby.dudeID,
        HobbyTitle: hobby.hobbyTitle
    });
}

this.getJob = function(dudeid, versionid) {
    return versionid ?  this.seqConn.models.DudeJobsUpdate.findAll({
                            where: {
                                DudeID: dudeid,
                                VersionID: versionid
                            }
                        }) :
                        this.seqConn.models.DudeJobsUpdate.findAll({
                            where: {
                                DudeID: dudeid
                            }
                        });
}

this.addJob = function(job) {
    return this.seqConn.models.DudeJobsUpdate.create({
        VersionID: job.versionID, 
        DudeID: job.dudeID,
        JobTitle: job.jobTitle ? job.jobTitle : '',
        Company: job.company ? job.company : '',
        Location: job.location ? job.location : ''
    });
}
