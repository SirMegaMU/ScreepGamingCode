var ScreepGenerate = {
    run:function()
    {
        /* 开始生产功能性Creep的界值 */
        var limit = 750;
        /* 各种工作的Screep数 */
        var numHarvester0 = 3       ; var numHarvester1 = 3         ; var numUpgrader = 2           ;
        var numBuilder = 3          ; var numRepairer = 1           ; var numWallBuilder = 2        ;
        var numTransferer = 2       ; var numOutHarvester0 = 3      ; var numOutHarvester1 = 2      ;
        var numfighter0 = 0         ; var numOutHarvester2 = 3      ;
        
        var transferer = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferer');
        if(transferer.length < numTransferer) {
            var newName = 'Transferer-' + Game.time;//console.log('Spawning new Transferer: ' + newName);
            //这个不能改，能量系统出问题了就靠它来解决了
            Game.spawns['Home1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'transferer'}});        
        }

        var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
        if(harvesters1.length < numHarvester1) {
            var newName = 'Harvester1-' + Game.time;//console.log('Spawning new harvester1: ' + newName);
            //WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE
            Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester1'}});        
        }

        var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
        if(harvesters0.length < numHarvester0) {
            var newName = 'Harvester0-' + Game.time;//console.log('Spawning new harvester0: ' + newName);
            Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester0'}});        
        }

        //重要！慎改！否则可能不会有些制造收集者！
        if(Game.rooms['W53N8'].energyAvailable>=limit)
        {
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if(upgraders.length < numUpgrader) {
                var newName = 'Upgrader-' + Game.time;//console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});        
            }

            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if(builders.length < numBuilder) {
                var newName = 'Builder-' + Game.time;//console.log('Spawning new builder: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder'}});        
            }

            var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            if(repairer.length < numRepairer) {
                var newName = 'Repairer-' + Game.time;//console.log('Spawning new maintenance: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'repairer'}});        
            }

            var wallbuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallbuilder');
            if(wallbuilder.length < numWallBuilder) {
                var newName = 'WallBuilder-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'wallbuilder'}});        
            }

            var outharvester0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester0');
            if(outharvester0.length < numOutHarvester0) {
                var newName = 'OutHarvester0-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'outharvester0'}});        
            }

            var outharvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester1');
            if(outharvester1.length < numOutHarvester1) {
                var newName = 'OutHarvester1-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'outharvester1'}});        
            }
            var outharvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester2');
            if(outharvester2.length < numOutHarvester2) {
                var newName = 'OutHarvester2-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
                Game.spawns['Home1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'outharvester2'}});        
            }
            var fighter0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter0');
            if(fighter0.length < numfighter0) {
                var newName = 'fighter0-' + Game.time;//console.log('Spawning new fighter0: ' + newName);
                Game.spawns['Home1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE], newName, {memory: {role: 'fighter0'}});        
            }
        }
    }
}
module.exports = ScreepGenerate;