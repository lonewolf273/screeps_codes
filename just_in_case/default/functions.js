/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions');
 * mod.thing == 'a thing'; // true
 */
var foo = function()
{
    console.log('hi');
}
var checkNumber = function(roleName)
{
    return _(Game.creeps).filter({memory: {role: roleName}}).size();
}

module.exports = { 
    distance: function(x1, y1, x2, y2)
    {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    },
    distance: function(o, a)
    {
        console.log('one:' + o.toString());
        console.log('two: ' + a.toString());
        return this.distance(o.pos.x, o.pos.y, a.pos.x, a.pos.y);
    },
    roleList : ['harvester', 'builder', 'extend', 'mechanic', 'transfer', 'upgrader', 'guard', 'archer', 'pick', 'taker'],
    get_source_number: function(source)
    {
        Game.creeps.prototype.room.find(FIND_SOURCES);
    },
    memory_update: function()
    {
        var spawnId = [];
        for (var s in Game.creeps[0].find(FIND_MY_STRUCTURES))
        {
            spawnId.push(id);
        }
        Memory.struct.idList = spawnId;
    },
    update: function(roleName)
    {
        for (var role in this.roleList)
        {
            console.log(this.roleList[role] + ": "  + checkNumber(this.roleList[role]));
            if (roleName == this.roleList[role])
            {
                var creepList = _.filter(Game.creeps, {memory: {role: roleName}})
                if (creepList.length > 0)
                {
                    console.log(this.roleList[role] + "\'s creeps: ");
                    var complete_list = "";
                    for (var creep in creepList)
                    {
                        var c = creepList[creep];
                        complete_list = complete_list + c + ": (" + c.pos.x + ", " + c.pos.y + ") ";
                    }
                    console.log(complete_list);
                }
                else console.log("ERR: NONE EXIST!");
            }
        }
    }
}
