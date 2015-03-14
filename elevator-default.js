{
	init: function(elevators, floors) {
        var numberOfFloors = floors.length;

		for (var i=0; i< elevators.length; i++) {
			console.log(elevator);
			var elevator= elevators[i];
			elevator.goToFloor(i);		
			setupElevator(elevator);
		}

		function setupElevator(elevator) {
			var elevatorLevelsRequested = [];

			elevator.on("idle", function() {
				elevator.goToFloor(0);
				elevator.goToFloor(floors.length);
			});


			elevator.on("floor_button_pressed", function(floorNum) {
				if (elevatorLevelsRequested.indexOf(floorNum)=== -1) {
					elevatorLevelsRequested.push(floorNum);
				}
			});

			elevator.on("stopped_at_floor", function(floorNum) {
				var i = elevatorLevelsRequested.indexOf(floorNum);
				if (i > -1) {
					elevatorLevelsRequested.splice(i, 1);
				}
				if (floorNum === 0) {
				    elevator.goingUpIndicator(true);
				    elevator.goingDownIndicator(false);
                }
                if (floorNum === numberOfFloors - 1) {
				    elevator.goingDownIndicator(true);
				    elevator.goingUpIndicator(false);
                }
			});

			elevator.on("passing_floor", function(floorNum, direction) {
				if((floors[floorNum].requested[direction] && elevator.loadFactor() < 1)
				||(elevatorLevelsRequested.indexOf(floorNum)> -1)) {
					elevator.goToFloor(floorNum, true);
					floors[floorNum].requested[direction] = false;
				}
			});
		}


		floors.forEach(function(floor) {
			floor.requested = [];
			floor.on("up_button_pressed", function() {
				floor.requested['up'] = true;
			});
			floor.on("down_button_pressed", function() {
				floor.requested['down'] = true;
			});
		});
	},
	update: function(dt, elevators, floors) {

	}
}

