/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transport');
 * mod.thing == 'a thing'; // true
 */

var roleTransport = {
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
}
module.exports = roleTransport;