// NPM Dependencies
const PubNub = require('pubnub');

const { controller } = require('./controller');

const pubnub = new PubNub({
  subscribeKey: 'sub-c-3e91234c-012f-11e9-a399-32ec39b2e34f',
  publishKey: 'pub-c-86d77efa-af69-435d-bd9d-d9e25341436f',
  uuid: 'droneboi'
});

pubnub.addListener({
  status: (statusEvent) => {
    const { operation, category } = statusEvent;

    switch (true) {
      case (category === 'PNConnectedCategory'):
        return console.log(`connected to channel ${statusEvent.affectedChannels}`);
      case (operation === 'PNUnsubscribeOperation'):
        return console.log(`disconnected from channel ${statusEvent.affectedChannels}`);
      default:
        return console.log('something else', statusEvent);
    }
  },
  presence: (presence) => {
    const { action, uuid, occupancy } = presence;
    switch (action) {
      case 'join':
        return console.log(`user join: ${uuid}`, `current usercount: ${occupancy}`);
      case 'leave':
        return console.log(`user left: ${uuid}`, `current usercount: ${occupancy}`);
      default:
        return console.log('something else', presence);
    }
  },
  message: (msg) => {
    if (msg.channel === 'controls') {
      const { message, publisher } = msg;
      const { control } = message;

      controller({ control, publisher });
    }
  }
});

exports.connect = channel => {
  console.log(`connecting to channel ${channel}`);
  pubnub.subscribe({
    channels: [channel],
    withPresence: true
  });
};

exports.disconnect = () => {
  pubnub.unsubscribeAll();
};
