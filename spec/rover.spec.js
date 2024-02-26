const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
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
    expect(response.results).toBe([{completed: true, roverStatus: {generatorWatts: 110, mode: "LOW_POWER", position: 98382}}])
  })

});
