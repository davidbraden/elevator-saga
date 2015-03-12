{
    init: function(elevators, floors) {
        var elevator0 = elevators[0];
        var elevator1 = elevators[1];
        var elevator2 = elevators[2];
        var elevator3 = elevators[3];
        
        elevator0.goToFloor(0);
        elevator1.goToFloor(2);
        elevator2.goToFloor(5);
        elevator3.goToFloor(1);

        setupElevator(elevator0, 0);
        setupElevator(elevator1, 1);
        setupElevator(elevator2, 2);
        setupElevator(elevator3, 3);

        function setupElevator(elevator, i) {

            elevator.on("idle", function() {
                elevator.goToFloor(0);
                elevator.goToFloor(5);
            });


            elevator.on("floor_button_pressed", function(floorNum) {
                floors[floorNum].requested = i;
            });

            elevator.on("stopped_at_floor", function(floorNum) {
                if (floors[floorNum].requested === i || floors[floorNum].requested === -1) {
                    floors[floorNum].requested = null;
                }
            });

            elevator.on("passing_floor", function(floorNum, direction) {
                if(((floors[floorNum].requested === -1 && elevator.loadFactor() < 0.8)
                    || floors[floorNum].requested === i)
                   && (direction === "up" || floorNum >2)
                  ) {
                    elevator.goToFloor(floorNum, true);
                }
                if (floorNum > 2) {

                }
            });
        };

floors.forEach(function(floor) {
    floor
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

