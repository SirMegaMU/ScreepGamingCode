var roleFighter = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                if(creep.attack(closestHostile)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(closestHostile);
                }
                else
                {
                    creep.attack(closestHostile);
                }
            }else
            {
                var closestHostileSturcture = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                if (creep.attack(closestHostileSturcture)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileSturcture);
                }
                else
                {
                    creep.attack(closestHostileSturcture)
                }
            }
	}
};
module.exports = roleFighter;