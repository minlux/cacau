const onvif = require('node-onvif');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  xaddr: 'http://192.168.178.52:8899/onvif/device_service',
  user : 'manuel',
  pass : 'manuel'
});

// Initialize the OnvifDevice object
device.init().then(() => {

  // Move the camera
  let params = {
    'speed': {
      x: 1.0, // Speed of pan (in the range of -1.0 to 1.0)
      y: 0.0, // Speed of tilt (in the range of -1.0 to 1.0)
      z: 0.0  // Speed of zoom (in the range of -1.0 to 1.0)
    },
    'timeout': 1 // seconds
  };
  device.ptzMove(params).then(() => {
    console.log('Done!');
  }).catch((error) => {
    console.error(error);
  });


  setTimeout(() => {
    device.ptzStop();
  }, 100); //200ms



}).catch((error) => {
  console.error(error);
});