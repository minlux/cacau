const onvif = require('node-onvif');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  xaddr: 'http://192.168.178.52:8899/onvif/device_service',
  user : 'manuel',
  pass : 'manuel'
});

// Initialize the OnvifDevice object
device.init().then(() => {

  let params = {
    'ProfileToken': '000'
  };

  device.services.ptz.getStatus(params).then((result) => {
    console.log('*** Status ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });



  let moveParams = {
    'ProfileToken': '000',
    'Position'    : {'x': 1, 'y': -1, 'z': 0 }
  };
  device.services.ptz.absoluteMove(moveParams).then((result) => {
    console.log(JSON.stringify(result, null, '  '));
  }).catch((error) => {
    console.error(error);
  });




}).catch((error) => {
  console.error(error);
});
