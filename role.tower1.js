var roleTower1 = {
    
    run: function() {
        
        var tower1 = Game.getObjectById('62680993fce9d37023245e64')

            if(tower1) {
                let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                let closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((
                                structure.structureType == STRUCTURE_ROAD || 
                                structure.structureType == STRUCTURE_CONTAINER && 
                                structure.hits < structure.hitsMax) || (
                                structure.structureType == STRUCTURE_RAMPART && 
                                structure.hits < 500)) ;   
                        }
                });
                    if(closestHostile) {
                        tower1.attack(closestHostile);
                    }
                    else if(closestDamagedStructure && tower1.store.getFreeCapacity(RESOURCE_ENERGY) < 200) {
                        tower1.repair(closestDamagedStructure);
                    }
            }
    }
}

module.exports = roleTower1;