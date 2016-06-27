/*module.exports = function (creep) {

	if(creep.energy < creep.energyCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
	}
} */
var actions = require('creep.actions');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            actions.harvest_source(creep, 1);
        }
        else {
            if (actions.give_energy(creep, STRUCTURE_EXTENSION, 0, true) != OK)
                actions.upgrade(creep);
        }
    }
};

module.exports = roleHarvester;