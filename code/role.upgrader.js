var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        SpawnRoom = creep.memory.SpawnRoom;
        WorkRoom = creep.memory.WorkRoom;
        /* 当前状态 */
        if (creep.memory.work != 'take' &&  creep.store.getUsedCapacity()==0) {
            creep.memory.work = 'take';creep.say('🛑take');
        }
        else if (creep.memory.work != 'GoWorking' && creep.room.name != WorkRoom && creep.store.getFreeCapacity()==0) {
            creep.memory.work = 'GoWorking';creep.say('🏃‍♀️');
        }
        else if (creep.memory.work != 'upgrade' && creep.room.name == WorkRoom &&creep.store.getFreeCapacity ==0) {
            creep.memory.work = 'upgrade';creep.say('🚧upgrade');
        }

        // 行为
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if(creep.memory.upgrading){
            let ruins = creep.room.find(FIND_RUINS,{
                filter: s => s.store[RESOURCE_ENERGY] > 0
            })
            if (ruins[0] != undefined){
                if (creep.withdraw(ruins[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(ruins[0]);
                }
            }
            else{
                // find closest container
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)&& s.store[RESOURCE_ENERGY] > 0
                });
                // if one was found
                if (container != undefined) {
                    // try to withdraw energy, if the container is not in range
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(container);
                    }
                }
                
                else{
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
	    }
	}
};
module.exports = roleUpgrader;