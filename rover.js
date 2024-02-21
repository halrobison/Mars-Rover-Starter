const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL'; 
      this.generatorWatts = 110; 
   }
   receiveMessage = function(message){
      let returnObject = {
         message: message.name,
         results: commandResponse(message.commands)
      }
      return returnObject;
   }
}

let commandResponse = function(commands){
   let resultsArray = [];
   let resultsObject = {
      completed: null, 
   }
   for (i = 0; i < commands.length; i++){
      if (commands[i].commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') {
            resultsObject.completed = false; 
            resultsArray.push(resultsObject);
         } else {
            resultsObject.completed = true; 
            this.position = commands[i].value;
            resultsArray.push(resultsObject);
         }
      }
      if (commands[i].commandType === 'STATUS_CHECK') {
         resultsObject.completed = true;
         let updatedResults = {
            'mode': this.mode, 
            'generatorWatts': this.generatorWatts, 
            'position': this.position
         }
         resultsObject['roverStatus'] = updatedResults
         resultsArray.push(resultsObject)
      }
      if (commands[i].commandType === 'MODE_CHANGE') {
         if (commands[i].value = 'LOW_POWER') {
            resultsObject.completed = true;
            this.mode = 'LOW_POWER';
         } else if (commands[i].value = 'LOW_POWER') {
            resultsObject.completed = true; 
            this.mode = 'NORMAL';
         } else {
            resultsObject.completed = false;
         }
         resultsArray.push(resultsObject)
      }
   }
   return resultsArray;
}

module.exports = Rover;

let roverTest = new Rover(100);
let commands = [
   new Command('MOVE', 4321),
   new Command('STATUS_CHECK'),
   new Command('MODE_CHANGE', 'LOW_POWER'),
   new Command('MOVE', 3579),
   new Command('STATUS_CHECK')
];
let message = new Message('TA power', commands);
let response = roverTest.receiveMessage(message);

console.log(response);
console.log(JSON.stringify(response, null, 2));