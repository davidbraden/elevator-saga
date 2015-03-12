{
    init: function(elevators, floors) {
        var timeWaiting = [0, 0, 0, 0, 0];

        var elevator = elevators[0]; // Let's use the first elevator

        elevator.on("idle", function() {
            elevator.goToFloor(timeWaiting.indexOf(timeWaiting.max()));
        });
        elevator.on("floor_button_pressed", function(floor) {
            console.log(timeWaiting);
            elevator.goToFloor(floor);
        });
        elevator.on("stopped_at_floor", function(floorNum) {
            incrementTime();
            timeWaiting[floorNum] = 0;
        });
        elevator.on("passing_floor", function(floorNum, direction) { 

        });

        floors.forEach(function(floor) {
            floor.on("up_button_pressed", function() {
                console.log(floor.floorNum() +  "up pressed");
                timeWaiting[floor.floorNum()] = 1;
            });
            floor.on("down_button_pressed", function() {
                console.log(floor.floorNum() +  "down pressed");
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

