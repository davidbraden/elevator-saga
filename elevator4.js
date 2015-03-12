{
    init: function(elevators, floors) {

        var elevator1 = elevators[0]; // Let's use the first elevator
        var elevator2 = elevators[1]; 



        elevator1.on("idle", function() {
            elevator1.goToFloor(0);
            elevator1.goToFloor(7);
        });
        elevator2.on("idle", function() {
            elevator2.goToFloor(0);
            elevator2.goToFloor(7);
        });


        elevator1.on("floor_button_pressed", function(floorNum) {
            floors[floorNum].requested = 1;
        });
        elevator2.on("floor_button_pressed", function(floorNum) {
            floors[floorNum].requested = 2;
        });

        elevator1.on("stopped_at_floor", function(floorNum) {
            if (floors[floorNum].requested !== 2) {
                floors[floorNum].requested = null;
            }
        });
         elevator2.on("stopped_at_floor", function(floorNum) {
            if (floors[floorNum].requested !== 1) {
                floors[floorNum].requested = null;
            }
        });

        elevator1.on("passing_floor", function(floorNum, direction) {
            if(floors[floorNum].requested === -1 || floors[floorNum].requested === 1) {
                elevator1.goToFloor(floorNum, true);
            } 
        });
        elevator2.on("passing_floor", function(floorNum, direction) {
            if(floors[floorNum].requested === -1 || floors[floorNum].requested === 2) {
                elevator2.goToFloor(floorNum, true);
            } 
        });

        floors.forEach(function(floor) {
            floor.on("up_button_pressed", function() {
                floor.requested = -1;
            });
            floor.on("down_button_pressed", function() {
                floor.requested = -1;
            });
        });
},
update: function(dt, elevators, floors) {

}
}

