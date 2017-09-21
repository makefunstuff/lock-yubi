const osxScreensaver = require('osx-screensaver'),
usbDetect = require('usb-detection'),
key = {};

usbDetect.find((err, devices) => {
  devices.forEach((device) => {
    if (device.manufacturer == "Yubico") {
        key.vid = device.vendorId;
        key.pid = device.productId;
        console.log('found', device, err)
        usbDetect.on(`remove:${key.vid}:${key.pid}`, function(device) { 
          console.log('remove', device);
          osxScreensaver().then(() => {
             console.log('Screensaver started');
        });
      });
    }
  });
});
