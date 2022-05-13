var GetScreepBody = {

    /**
     * 
     * @param {string} roomname 
     */
    run:function(roomname,creeprole){
        var BasicBody = Memory.CreepBody;
        room = Game.rooms[roomname];
        var spawntotal = room.find(FIND_MY_STRUCTURES,
            {filter:(structure)=>{return(structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)}});
        if (spawntotal==1) {
            return BasicBody[creeprole];
        }
    }
}
module.export = GetScreepBody;