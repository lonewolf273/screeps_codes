var actions = require('creep.actions');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var what = creep.room.find(FIND_SOURCES)[0];
            if(creep.harvest(what) == ERR_NOT_IN_RANGE) {
                creep.moveTo(what);
            }
        }
        else {
            if(actions.store_energy(creep, STRUCTURE_CONTAINER, 0) != OK)
                actions.give_energy(creep, STRUCTURE_EXTENSION, 0);
        }
    }
};

module.exports = roleHarvester;