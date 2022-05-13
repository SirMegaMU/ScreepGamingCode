var roleReserver = {

    
    /** @param {Creep} creep     **/

    run: function(creep) {

        roomname = creep.memory.targetroom;
        if (creep.room.name!=roomname){
            creep.moveTo(new RoomPosition(25, 25, roomname),{reusePath:10})
        }
        else{
            let Controller = creep.room.controller;
            if (creep.claimController(Controller)==ERR_NOT_IN_RANGE) {
                creep.moveTo(Controller);
            }
        }
	}
};

module.exports = roleReserver;