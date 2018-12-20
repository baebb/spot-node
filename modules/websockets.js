// NPM Dependencies
const PubNub = require('pubnub');

const pubnub = new PubNub({
  subscribeKey: 'sub-c-3e91234c-012f-11e9-a399-32ec39b2e34f',
  publishKey: 'pub-c-86d77efa-af69-435d-bd9d-d9e25341436f'
});

pubnub.addListener({
  status: (statusEvent) => {
    if (statusEvent.category === "PNConnectedCategory") {
      console.log(`connected to ${statusEvent.affectedChannels}`);
    } else {
      console.log('something else', statusEvent);
    }
  },
  message: (msg) => {
    console.log('wow got', msg);
  }
});

export const connect = channel => {
  console.log(`connecting to ${channel}`);
  pubnub.subscribe({
    channels: [channel]
  });
};

export const disconnect = () => {
  pubnub.unsubscribeAll();
};
