var CreepGenerate = require('creepgenerate');
var WorkDispatch = require('workdispatch');


var CreepsitributeHome = {Harvester:3,Upgrader:1,Builder:0,Repairer:1,WallBuilder:1,Transferer:1,Reserver:0,Fighter:0};
var CreepsitributeReserved = {Harvester:3,Upgrader:0,Builder:0,Repairer:1,WallBuilder:0,Transferer:1,Reserver:1,Fighter:0};

var Mybase = {
    W53N8:['Home',CreepsitributeHome,15000],
    W53N7:[{Reserved:W53N8},CreepsitributeReserved,1000]
};

var CreepBody = {
    Harvester:3,
    Upgrader:1,
    Builder:0,
    Repairer:1,
    WallBuilder:1,
    Transferer:1,
    Reserver:0,
    Fighter:0
}

module.exports.loop = function () {

    Memory.Mybase = Mybase;
    Memory.CreepBody = CreepBody;

    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);}
    }
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    CreepGenerate.run(Memory.Mybase);
    WorkDispatch.run(Memory.Mybase);
}