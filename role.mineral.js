var roleMineral = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var mineral = creep.room.find(FIND_MINERALS);
            if(creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mineral[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE      }
        });
            if(targets) {
                for(const resourceType in creep.carry) {
                    if(creep.transfer(targets, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleMineral;