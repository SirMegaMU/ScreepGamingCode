var ScreepGenerate = {
    run:function()
    {
        /* 开始生产功能性Creep的界值 */
        var limit = 750;
        /* 各种工作的Screep数 */
        var numHarvester0 = 1       ; var numHarvester1 = 1         ; var numMineral = 1            ;
        var numUpgrader = 2         ; var numUpgrader1 = 2           ;
        var numBuilder = 2          ; var numBuilder1 = 1           ;
        var numRepairer = 1         ; var numRepairer1 = 2         ; 
        var numWallBuilder = 1      ;
        var numTransferer = 3       ; var numOutHarvester1 = 2      ; var numReserver = 0           ;
        var numfighter0 = 0         ; var numOutHarvester2 = 5      ; var numCarrier = 1            ;
        
        var transferer = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferer');
        if(transferer.length < numTransferer) {
            var newName = 'Transferer-' + Game.time;//console.log('Spawning new Transferer: ' + newName);
            //这个不能改，能量系统出问题了就靠它来解决了
            Game.spawns['Home1'].spawnCreep([CARRY,MOVE], newName, 
                {memory: {role: 'transferer'}});        
        }
        var carrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
        if(carrier.length < numCarrier) {
            var newName = 'Carrier-' + Game.time;numCarrier
            Game.spawns['Home1'].spawnCreep([CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY], newName, 
                {memory: {role: 'carrier'}});        
        }

        var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
        if(harvesters1.length < numHarvester1) {
            var newName = 'Harvester1-' + Game.time;
            Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester1'}});        
        }

        var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
        if(harvesters0.length < numHarvester0) {
            var newName = 'Harvester0-' + Game.time;
            Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester0'}});        
        }

        //重要！慎改！否则可能不会有些制造收集者！
        if(Game.rooms['W53N8'].energyAvailable>=limit)
        {
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if(upgraders.length < numUpgrader) {
                var newName = 'Upgrader-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});        
            }
            
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if(builders.length < numBuilder) {
                var newName = 'Builder-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder'}});        
            }
            var builders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder1');
            if(builders1.length < numBuilder1) {
                var newName = 'Builder1-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder1'}});        
            }

            var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            if(repairer.length < numRepairer) {
                var newName = 'Repairer-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'repairer'}});        
            }

            var wallbuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallbuilder');
            if(wallbuilder.length < numWallBuilder) {
                var newName = 'WallBuilder-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'wallbuilder'}});        
            }
            /**
             *   外矿Creep
             */
            var outharvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester1');
            if(outharvester1.length < numOutHarvester1) {
                var newName = 'OutHarvester1-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'outharvester1',targetroom:'W53N9',targetHome:'W53N8'}});        
            }
            var outharvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester2');
            if(outharvester2.length < numOutHarvester2) {
                var newName = 'OutHarvester2-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'outharvester2',targetroom:'W53N7',targetHome:'W53N8'}});        
            }

            var mineral = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineral');
            if(outharvester2.length < numMineral) {
                var newName = 'Mineral-' + Game.time;
                Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'mineral',targetroom:'W53N8',targetHome:'W53N8'}});        
            }
            /**
             *   预定房间
             */
             var reserver = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
             if(reserver.length < numReserver) {
                 var newName = 'Reserver-' + Game.time;
                 Game.spawns['Home1'].spawnCreep([CLAIM,MOVE,MOVE], newName, {memory: {role: 'reserver',targetroom:'W53N7'}});        
             }

            /**
             *   战斗Creep
             */
            var fighter0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter0');
            if(fighter0.length < numfighter0) {
                var newName = 'fighter0-' + Game.time;//console.log('Spawning new fighter0: ' + newName);
                Game.spawns['Home1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE], newName, {memory: {role: 'fighter0'}});        
            }
        }
        var upgraders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
        if(upgraders1.length < numUpgrader1) {
            var newName = 'Upgrader1-' + Game.time;
            Game.spawns['Base2'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader1'}});        
        }
        var repairer1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer1');
        if(repairer1.length < numRepairer1) {
            var newName = 'Repairer-' + Game.time;
            Game.spawns['Base2'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'repairer1'}});        
        }
    }
}
module.exports = ScreepGenerate;