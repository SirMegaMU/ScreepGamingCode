var roleTower1 = {
    
    run: function() {
        var tower1 = Game.getObjectById('62680993fce9d37023245e64')
        var towers = [tower1];
        
        for(var tower in towers);
        {
            if(tower) {
                let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax);
                        }
                    });
                    if(closestHostile) {
                        tower.attack(closestHostile);
                    }
                    else if(closestDamagedStructure && tower.store.getFreeCapacity(RESOURCE_ENERGY) < 200) {
                        tower.repair(closestDamagedStructure);
                    }
            }
        }
    }
}

module.exports = roleTower1;