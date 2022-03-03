# CACAU - Camera Capture Annotate and Upload

This project provides a script to capture a picture from an IP webcam, annotate it with a timestamp and upload it to an FTP server.
The script does also store a copy of each captured picture in subfolder `capture`, for the aim of a time lapse video.


## Camera

A chinese camera with the following "specification" is used:
```
"Manufacturer": "H264"
"Model": "XM530_R80X20-PQ_8M"
"FirmwareVersion": "V5.00.R02.00030695.10010.343106..ONVIF 2.41",
```


## Capture

### Snapshot
The above mentioned camera has a *REST* endpoint to capture a picture (sadly only in low resolution: **640x360**). The following *curl* command executed on a linux command line, fetches the picture:
```
curl "http://<ip-of-cam>/webcapture.jpg?command=snap" -o snapshot.jpg
```

### Audio-/Video-Stream
The camera provides a *full HD* audio-/video-stream at the following *url* (which can be played for example with *vlc* or *ffplay*):
```
rtsp://<ip-of-cam>:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream
```

Note: With *ffplay* parameter `-an` audio playback can be disabled.
```
ffplay -an 'rtsp://192.168.178.52:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream'
```



The stream can be used to capture a picture with **1920x1080**. This is done with *ffmpeg*:
```
ffmpeg -f rtsp -rtsp_transport tcp -y -i "rtsp://<ip-of-cam>:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream" -f image2 -vframes 1 -vsync 2 snapshot.jpg
```


Note: Using the following command, the current date is included in the filname of the captured picture:
```
ffmpeg -f rtsp -rtsp_transport tcp -y -i "rtsp://<ip-of-cam>:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream" -f image2 -vframes 1 -vsync 2 "snapshot_$(date +%Y-%m-%d_%H-%M-%S).jpg"
```


## Annotate

Annotation of the picture with current timestamp can be done directly at the time it is captured with *ffmpeg*, for example like this:
```
ffmpeg -f rtsp -rtsp_transport tcp -y -i "rtsp://<ip-of-cam>:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream" -f image2 -vframes 1 -vsync 2 -vf "drawtext=text='%{localtime\:%Y/%m/%d %H\\\\\:%M}':x=10:y=10:fontsize=24:fontcolor=white" "snapshot_hd.jpg"
```

Another solution is the usage of ImageMagick's *convert*:
```
convert snapshot.jpg -fill '#0008' -draw 'rectangle 0,0,250,40' -pointsize 30 -fill white -annotate +8+30 "$(date +%Y/%m/%d\ %H:%M)" snapshot_ts.jpg
```


## Upload 

The upload of the picture to an FTP server is done using *curl*:
```
curl --upload-file snapshot_ts.jpg ftp://<server-url>/<optional-subfolders>/<optional-filename> --user <ftp-user>:<ftp-password>
```


## Time lapse video

In order to create - later on - a time lapse video from the captured pictures, they are moved to subfolder `capture`. Thereby a timestamp is added to the filename:
```
mv snapshot_ts.jpg "capture/snapshot_$(date +%Y-%m-%d_%H-%M-%S).jpg"
```


To create the video from the pictures in folder `capture`, *ffmpeg* is used:
```
ffmpeg -framerate 12 -pattern_type glob -i "snapshot_*.jpg" timelapse.mp4
```



# Related Resources
- https://github.com/futomi/node-onvif
- https://gist.github.com/gabonator/3d2bc36e9eb62c52742d45113126c1ba


