{
    init: function(elevators, floors) {
        var timeWaiting = [0, 0, 0, 0, 0];

        var elevator = elevators[0]; // Let's use the first elevator

        elevator.on("idle", function() {
            elevator.goToFloor(0);
            elevator.goToFloor(4);
        });
        elevator.on("floor_button_pressed", function(floorNum) {
            floors[floorNum].requested = true;
        });
        elevator.on("stopped_at_floor", function(floorNum) {
            floors[floorNum].requested = null;
            incrementTime();
            timeWaiting[floorNum] = 0;
        });
        elevator.on("passing_floor", function(floorNum, direction) {
            if(floors[floorNum].requested) {
                elevator.goToFloor(floorNum, true);
            } 
        });

        floors.forEach(function(floor) {
            floor.on("up_button_pressed", function() {
                floor.requested = true;
                timeWaiting[floor.floorNum()] = 1;
            });
            floor.on("down_button_pressed", function() {
                floor.requested = true;
                timeWaiting[floor.floorNum()] = 1;
            });
        });

        Array.prototype.max = function() {
          return Math.max.apply(null, this);
      };

      Array.prototype.min = function() {
          return Math.min.apply(null, this);
      };


      function incrementTime() {
        for (var i = 0; i < timeWaiting.length; i++) {
            if (timeWaiting[i] > 0) {
                timeWaiting[i] = timeWaiting[i] + 1;
            }
        }
    };
},
update: function(dt, elevators, floors) {

}
}

