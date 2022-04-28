var WorkDispatch = require('workdispatch');
var ScreepGenerate = require('screepgenerate');



module.exports.loop = function () {

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
    WorkDispatch.run();
    
    ScreepGenerate.run();

    var fighter0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter0');
        if(fighter0.length < 1) {
            var newName = 'fighter0-' + Game.time;//console.log('Spawning new fighter0: ' + newName);
            Game.spawns['Home1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE], newName, 
                {memory: {role: 'fighter0'}});        
        }

}