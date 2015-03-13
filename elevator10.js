{
	init: function(elevators, floors) {
		for (var i=0; i< elevators.length; i++) {
			console.log(elevator);
			var elevator= elevators[i];
			elevator.goToFloor(i);
			setupElevator(elevator, i);
		}

		function setupElevator(elevator, i) {
			var elevatorLevelsRequested = [];

			elevator.on("idle", function() {
				elevator.goToFloor(0);
				//if (i === 0) {
				//	elevator.goingUpIndicator(true);
				//	elevator.goingDownIndicator(false);
				//}
				elevator.goToFloor(floors.length);
				//if (i === 0) {
				//	elevator.goingUpIndicator(false);
				//	elevator.goingDownIndicator(true);
				//}
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
				floors[floorNum].requested = false;
			});

			elevator.on("passing_floor", function(floorNum, direction) {
				if((floors[floorNum].requested && elevator.loadFactor() < 1 && direction == 'up')
					||(elevatorLevelsRequested.indexOf(floorNum)> -1)) {
					elevator.goToFloor(floorNum, true);
				}
				if (i === 1 && Math.max.apply(null, elevatorLevelsRequested) < floorNum) {
					elevator.goToFloor(0, true);
				}
			});
		}

		floors.forEach(function(floor) {
			floor.on("up_button_pressed", function() {
				floor.requested = true;
			});
			floor.on("down_button_pressed", function() {
				floor.requested = true;
			});
		});
	},
	update: function(dt, elevators, floors) {

	}
}

