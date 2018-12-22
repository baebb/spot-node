// NPM Dependencies
const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyACM0', (error) => error && console.log('Error on port: ', error));

const controlKey = (control) => {
  switch(control) {
    case 'up':
      return 'f';
    case 'down':
      return 'b';
    case 'left':
      return 'l';
    case 'right':
      return 'r';
    case 'stop':
      return 's';
    default:
      return null;
  }
};

const writeToPort = (control) => {
  port.write(control, (error) => error && console.log('Error on write: ', error));
};

exports.controller = (control) => {
  const command = controlKey(control);

  if (command) {
    console.log(`Command: ${control}`);
    writeToPort(command);
  }
};
