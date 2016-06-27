/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.mechanic');
 * mod.thing == 'a thing'; // true
 */
var find_container = function(creep)
{
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) &&
            (_.sum(structure.store) > creep.carryCapacity);
        }
    });
    if (targets.length > 0) return targets[0];
    else return null;
}
var roleMechanic = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            creep.memory.fixing = false;
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.fixing = true;
        }

        if(creep.memory.fixing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            targets.sort((a, b) => a.hits - b.hits)
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var transferers = find_container(creep);
            if (transferers == null)
            {
                var what = sources[0];
                if(creep.harvest(what) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(what);
                }
            }
            else
            {
                if(transferers.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(transferers);
                }
                else console.log(transferers.transfer(creep));
            }
        }
    }
};

module.exports = roleMechanic;