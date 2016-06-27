/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.spawner');
 * mod.thing == 'a thing'; // true
 */
const PARTS_DEFAULT = [WORK, MOVE, CARRY];
var checkNumber = function(roleName)
{
    return _(Game.creeps).filter({memory: {role: roleName}}).size();
}


var check_min = function(role, number)
{
   if (checkNumber(role) < number) return true;
   return false;
}


var structSpawn = {
    spawnerName : null,

    min_create: function(role, number, parts = [WORK, MOVE, CARRY])
    {
        if (check_min(role, number))
        {
            this.add_creep(parts, role);
            return true;
        }
        return false;
    },

    create_basics: function()
    {
        var sizes = [];
        var jobList = ['harvester', 'extend', 'mechanic' , 'upgrader', 'builder', 'transfer', 'guard', 'archer'];
        var partList = [[], [],[],[],[],[],[MOVE, MOVE, TOUGH, ATTACK], [RANGED_ATTACK, MOVE, MOVE, TOUGH]];
        for(var jobIndex in jobList)
        {
            var jobName = jobList[jobIndex];
            var parts = partList[jobIndex];
            if (parts == [])
            {
                if (this.min_create(jobName, 1)) 
                {
                    console.log('what ' +jobName);
                    return jobName;
                }
            } else
            {
                if (this.min_create(jobName, 1, parts)) return jobName;
            }
            //sizes.push(check_min(jobName, 1));
        }
        //console.log(sizes);
        return null;
    },
    create_min: function()
    {
        var sizes = [5, 3, 2, 2, 3, 6, 3, 2];
        var jobList = ['builder', 'harvester', 'extend', 'mechanic', 'upgrader', 'transfer', 'guard', 'archer'];
        var partList = [[MOVE, WORK, WORK, WORK, CARRY],[], [MOVE, MOVE, WORK, CARRY], [MOVE, MOVE, WORK, CARRY],[],[],[MOVE, MOVE, TOUGH, ATTACK], [RANGED_ATTACK, MOVE, MOVE, TOUGH]];
        for(var jobIndex in jobList)
        {
            var jobName = jobList[jobIndex];
            var parts = partList[jobIndex];
            if (parts == [])
            {
                if (this.min_create(jobName, sizes[jobIndex])) 
                {
                    return jobName;
                }
            } else
            {
                if (this.min_create(jobName, sizes[jobIndex], parts)) return jobName;
            }
        }
        return null;
    },
    add_creep: function(parts, role)
    {
        //console.log(role);
        if (parts.length == 0) parts = PARTS_DEFAULT;
        if (this.spawnerName.room.find(FIND_DROPPED_ENERGY).length && checkNumber('pick') < 3)
        {
            var newName = this.spawnerName.createCreep([MOVE, CARRY], undefined, {role: 'pick'});
            console.log('Spawning new ' + 'picker' + ': ' + newName);            
        }
        if (this.spawnerName.canCreateCreep(parts) == 0)
        {
            var newName = this.spawnerName.createCreep(parts, undefined, {role: role});
            console.log('Spawning new ' + role + ': ' + newName);
            return true;
        }
        else if (this.spawnerName.energyCapacity == this.spawnerName.energy)
        {
            var newName = this.spawnerName.createCreep(PARTS_DEFAULT, undefined, {role: role});
            console.log('Spawning new ' + role + ': ' + newName);
        }
        return false;
    },
    create_random: function()
    {
        var building_blocks = ['builder', 'harvester', 'extend', 'mechanic', 'upgrader', 'transfer', 'guard', 'archer']
        var r = Math.floor(Math.random() * building_blocks.length);
        while (r >= building_blocks.length)
        {
            r -= 1;
        }
        this.add_creep(PARTS_DEFAULT, building_blocks[r]);
    },
    run: function(spawner)
    {
        this.spawnerName = spawner;
        if (this.create_basics() == null)
            if (this.create_min() == null)
            {
                //this.add_creep([MOVE, CARRY, CARRY, MOVE, WORK], 'upgrader');
            }
        if (this.spawnerName.energy == this.spawnerName.energyCapacity)
        {
            this.create_random();
        }
    },
};

module.exports = structSpawn;