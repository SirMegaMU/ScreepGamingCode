var roleHarvester0 = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_SPAWN ||
                            // structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_CONTAINER ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            }
        }
	}
};

module.exports = roleHarvester0;