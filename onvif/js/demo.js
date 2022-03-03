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
  // Show the detailed information of the device.
  console.log('*** Device Info ***');
  console.log(JSON.stringify(info, null, '  '));

  // Get the UDP stream URL
  // let url = device.getUdpStreamUrl();
  // console.log(url);

  // Get current profile
  console.log('*** Current Profile ***');
  let profile = device.getCurrentProfile();
  console.log(JSON.stringify(profile, null, '  '));

  // Get a list of the profiles set in the device
  console.log('*** Profile List ***');
  let profile_list = device.getProfileList();
  console.log(JSON.stringify(profile_list, null, '  '));


  // Get Services
  let params = {
    'IncludeCapability': true
  };
  device.services.device.getServices(params).then((result) => {
    console.log('*** Services ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Get Network Protocols
  device.services.device.getNetworkProtocols().then((result) => {
    console.log('*** Protocols ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Users
  device.services.device.getUsers().then((result) => {
    console.log('*** Users ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Device Information
  // device.services.device.getDeviceInformation().then((result) => {
  //   console.log('*** Device Information ***');
  //   console.log(JSON.stringify(result['data'], null, '  '));
  // }).catch((error) => {
  //   console.error(error);
  // });

  //System Time
  device.services.device.getSystemDateAndTime().then((result) => {
    console.log('*** System Time ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Hostname
  device.services.device.getHostname().then((result) => {
    console.log('*** Hostname ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });

  //Network Interfaces
  device.services.device.getNetworkInterfaces().then((result) => {
    console.log('*** Network Interfaces ***');
    console.log(JSON.stringify(result['data'], null, '  '));
  }).catch((error) => {
    console.error(error);
  });



}).catch((error) => {
  console.error(error);
});