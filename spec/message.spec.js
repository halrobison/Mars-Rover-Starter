const Message = require('../message.js');
const Command = require('../command.js');

// NOTE:  If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if a name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
      });
    
      it("constructor sets name", function() {
        let messageTest = new Message('Test message');
        expect(messageTest.name).toBe('Test message')
      });

      it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commandsArray = [new Command('MODE_CHANGE'), new Command('STATUS_CHECK')];
        let messageTest = new Message('Test message', commandsArray);
        expect(messageTest.commands).toBe(commandsArray)
      })
    
    });
