const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

//  NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here! - completed and running
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let roverTest = new Rover(98382);
    expect(roverTest.mode).toBe('NORMAL')
    expect(roverTest.generatorWatts).toBe(110);
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let roverTest = new Rover(98382); 
    let response = roverTest.receiveMessage(message); 
    expect(response.message).toBe('Test message');
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let roverTest = new Rover(98382); 
    let response = roverTest.receiveMessage(message); 
    expect(response.results).toHaveLength(2);
  })

  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')]
    let message = new Message('Status check', commands);
    let roverTest = new Rover(98382); 
    let response = roverTest.receiveMessage(message); 
    expect(response.results).toEqual([{completed: true, roverStatus: {generatorWatts: 110, mode: "NORMAL", position: 98382}}])
  })

  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message('Move', commands); 
    let roverTest = new Rover (98382); 
    let response = roverTest.receiveMessage(message); 
    expect(response.results).toEqual([{completed: true}, {completed:true}])
  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1234)]
    let message = new Message('Change mode and move', commands); 
    let roverTest = new Rover (98382); 
    let response = roverTest.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}, {completed: false}])
  })

  it("responds with the position for the move command", function () {
    let commands = [new Command('MOVE', 1234), new Command('STATUS_CHECK')]
    let message = new Message('Move and check', commands); 
    let roverTest = new Rover (98382); 
    let response = roverTest.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}, {completed: true, roverStatus: {generatorWatts: 110, mode: "NORMAL", position: 1234}}])
  })
});
