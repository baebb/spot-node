// NPM Dependencies
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
//
// const port = new SerialPort(path, { baudRate: 256000 });
// const parser = new Readline();
// port.pipe(parser);

// parser.on('data', line => console.log(`> ${line}`));

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

exports.controller = (control) => {
  console.log(`I would move ${control} now`);
  const executeControl = controlKey(control);

  if (executeControl) {
    // port.write(executeControl);
  }
};
