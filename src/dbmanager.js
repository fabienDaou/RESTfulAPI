var Sequelize = require('sequelize'),
    Sqlite = require('sqlite3').verbose();


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
        HobbyTitle: Sequelize.STRING
    },
    {
        freezeTableName: true
    });

    this.seqConn.define('DudeJobUpdate', {
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
        JobTitle: Sequelize.STRING,
        Company: Sequelize.STRING,
        Location: Sequelize.STRING
    },
    {
        freezeTableName: true
    });

}

this.addDude = function(dude) {
    if(!dude.fullname){
        return 0;
    }
    return this.seqConn.models.Dude.create({
        Fullname: dude.fullname,
        Phone: dude.phone,
        Email: dude.email
    });
}


this.addVersion = function(profile) {
    if(!profile.dudeID){
        console.log("[ERROR] ", "Malformed profile object.")
        return 0;
    }
    return profile.date ?   this.seqConn.models.DudeProfileVersion.create({DudeID: profile.dudeID, Date: profile.date}) :
                            this.seqConn.models.DudeProfileVersion.create({DudeID: profile.dudeID});
}


this.startDoingStuff = function() {
    var that = this;
    var result = this.seqConn.models.Dude.findAll({
        attributes : ['DudeID', 'Fullname', 'Phone', 'Email']
    });

    result
    .then(function(data){
        var current = null;
        for(var i = 0; i < data.length; i++){
            current = data[i].dataValues;
            console.log(current.DudeID + '/' + current.Fullname + '/' + current.Phone + '/' + current.Email);
        }

        console.log(current);

        var result2 = that.addVersion({dudeID: current.DudeID});
        result2.then(function() {
            that.seqConn.models.DudeProfileVersion.findAll({
                attributes : ['VersionID', 'DudeID', 'Date']
            }).then(function(data) {
                var current = null;
                for(var i = 0; i < data.length; i++){
                    current = data[i].dataValues;
                    console.log(current.VersionID + '/' + current.DudeID + '/' + current.Date);
                }
            });
        });
    })
    .catch(function(error){
        console.log("Query error \n" + error);
    })
    .done();
}