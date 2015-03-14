{
	init: function(elevators, floors) {
        var numberOfFloors = floors.length;
        
			elevators[0].goToFloor(8);
        
        
		for (var i=0; i< elevators.length; i++) {
			console.log(elevator);
			var elevator= elevators[i];
			setupElevator(elevator, i);
		}

		function setupElevator(elevator, i) {
			var elevatorLevelsRequested = [];

			elevator.on("idle", function() {
				elevator.goToFloor(0);
				elevator.goToFloor(numberOfFloors);
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
                if (floorNum === 0) {
				    elevator.goingUpIndicator(true);
                }
                if (floorNum === numberOfFloors - 1) {
				    elevator.goingDownIndicator(true);
                }
			});

			elevator.on("passing_floor", function(floorNum, direction) {
				elevator.goingUpIndicator(direction === 'up' && floorNum !== (numberOfFloors - 1));
				elevator.goingDownIndicator(direction === 'down' && floorNum !== 0);
                
				if((floors[floorNum].requested === direction && elevator.loadFactor() < 1)
					||(elevatorLevelsRequested.indexOf(floorNum)> -1)) {
					elevator.goToFloor(floorNum, true);
				}
			});
		}

		floors.forEach(function(floor) {
			floor.on("up_button_pressed", function() {
				floor.requested = 'up';
			});
			floor.on("down_button_pressed", function() {
				floor.requested = 'down';
			});
		});
	},
	update: function(dt, elevators, floors) {

	}
}

