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
            //harvest until full
            actions.harvest_source_close(creep);
        }
        else {
            //move to give the energy to a spawn or an extension
            if (actions.give_energy(creep, STRUCTURE_SPAWN, 0) != OK)
                actions.give_energy(creep, STRUCTURE_EXTENSION, 0);
        }
    }
};

module.exports = roleHarvester;