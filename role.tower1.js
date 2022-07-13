var roleTower1 = {
    
    run: function() {
        
        var tower1 = Game.getObjectById('62680993fce9d37023245e64')
        var tower2 = Game.getObjectById('6270aecfc96f863e87651ac9')
        var tower3 = Game.getObjectById('6282a40d1549704462ca2216')
        
        if(tower1) {
            let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER  ) && structure.hits < structure.hitsMax) ||
                            ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits<1500);
                    }
                });
                if(closestHostile) {
                    tower1.attack(closestHostile);
                }
                else if(closestDamagedStructure && tower1.store.getFreeCapacity(RESOURCE_ENERGY) < 200) {tower1.repair(closestDamagedStructure);}
        }
        if(tower3) {
            let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER  ) && structure.hits < structure.hitsMax) ||
                            ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits<1500);
                    }
                });
                if(closestHostile) {
                    tower1.attack(closestHostile);
                }
                else if(closestDamagedStructure && tower1.store.getFreeCapacity(RESOURCE_ENERGY) < 200) {tower1.repair(closestDamagedStructure);}
        }
        if(tower2) {
            let closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER  ) && structure.hits < structure.hitsMax) ||
                            ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits<1500);
                    }
                });
                if(closestHostile) {
                    tower2.attack(closestHostile);
                }
                //else if(closestDamagedStructure && tower1.store.getFreeCapacity(RESOURCE_ENERGY) < 200) {tower2.repair(closestDamagedStructure);}
        }
    }
}

module.exports = roleTower1;