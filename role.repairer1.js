var roleRepairer1 = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
			creep.say('🔄 take');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');//decide what to do
	    }

	    if(creep.memory.repairing) {
			var broken = creep.pos.findClosestByPath(FIND_STRUCTURES, 
                {filter: structure => structure.hits < structure.hitsMax && 
                    structure.structureType != STRUCTURE_WALL &&
                    structure.structureType != STRUCTURE_RAMPART
                });
				if(broken) {
					if(creep.repair(broken) == ERR_NOT_IN_RANGE) {
						creep.moveTo(broken);// check if there are broken structures
					}
				}
	    }
	    else {
            let ruins = creep.pos.findClosestByPath(FIND_RUINS,{
                filter: s => s.store[RESOURCE_ENERGY] > 0
            })
            if (ruins != undefined){
                if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(ruins);
                }
            }
            else{
            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            /*
            if (container == undefined) {
                container = creep.room.storage;
            }
            */
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            }
            }
	    }
	}
};

module.exports = roleRepairer1;