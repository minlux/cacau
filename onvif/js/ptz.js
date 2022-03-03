const onvif = require('node-onvif');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  xaddr: 'http://192.168.178.52:8899/onvif/device_service',
  user : 'manuel',
  pass : 'manuel'
});

// Initialize the OnvifDevice object
device.init().then(() => {
  //Get Nodes
  device.services.ptz.getNodes().then((result) => {
    console.log('*** PTZ Nodes ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Get Node
  let params = {
    'NodeToken': '000'
  };
  device.services.ptz.getNode(params).then((result) => {
    console.log('*** PTZ Node ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });


  //Get Configurations
  device.services.ptz.getConfigurations().then((result) => {
    console.log('*** Configurations ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });


}).catch((error) => {
  console.error(error);
});
