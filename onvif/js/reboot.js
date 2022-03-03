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
  device.services.device.reboot(params).then((result) => {
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });
}).catch((error) => {
  console.error(error);
});