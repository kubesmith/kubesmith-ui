// internal dependencies
import config from '@/config';

// constants
const socket = new WebSocket(`${config.WEBSOCKET_URL}/v1/ws`);

// logic
const sendPing = () => {
  socket.send(JSON.stringify({
    action: 'ping',
  }));

  setTimeout(sendPing, 1000);
};

socket.onopen = () => {
  sendPing();
};

socket.onmessage = (event) => {
  let data = {};

  try {
    data = JSON.parse(event.data);
  } catch (err) {
    //
  }

  // eslint-disable-next-line
  console.log(data.type);
};

// exports
export default socket;
