var actions = require('creep.actions');

var roleUpgrader = {
    run: function(creep) {
        if(creep.carry.energy == 0) creep.memory.building = false;
        if(creep.carry.energy == creep.carryCapacity) creep.memory.building = true;
        
        if(creep.memory.building == false)
            actions.harvest_source(creep, 1);
        else
            actions.upgrade(creep);
    }
};

module.exports = roleUpgrader;