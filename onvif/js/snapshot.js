const onvif = require('node-onvif');
const fs = require('fs');


// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  xaddr: 'http://192.168.178.52:8899/onvif/device_service',
  user : 'manuel',
  pass : 'manuel'
});

// Initialize the OnvifDevice object
device.init().then((info) => {
  // Get the data of the snapshot
  console.log('fetching the data of the snapshot...');
  return device.fetchSnapshot();
}).then((res) => {
  // console.log(res);
  // Save the data to a file
  fs.writeFileSync('snapshot.jpg', res.body, {encoding: 'binary'});
  console.log('Done!');
}).catch((error) => {
  console.error(error);
});