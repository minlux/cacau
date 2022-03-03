#! /bin/bash
# capture picture from camera, annotate it with current timestamp, upload it to ftp server and store it for time-lapse video creation

# arguments
CAM_IP=192.168.178.52
FTP_HOST="your.ftp-server.com"
FTP_PATH="/html/home/webcam" #leaf empty to place file into root directory. otherwise ensure that the path starts with a '/' (e.g. /html/home/webcam)
FTP_USER="user123"
FTP_PASS="53cr3t"

# get the current timestamp (two formats. one for annotation, the other one for the filename suffix)
NOW1="$(/bin/date +%Y/%m/%d\ %H:%M)"
NOW2="$(/bin/date +%Y%m%d-%H%M)"


# capture snapshot from video-stream (either in 640*360 (curl ...) or 1920*1080 (ffmpeg ...))
curl "http://${CAM_IP}/webcapture.jpg?command=snap" -o snapshot.jpg
#ffmpeg -f rtsp -rtsp_transport tcp -y -i "rtsp://${CAM_IP}:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream" -f image2 -vframes 1 -vsync 2 snapshot.jpg


# annotate snapshot with current timestamp (to adjust the the size of the annotation use 1st line if you capture in 640*360 and 2nd line if you capture in 1920*1080
convert snapshot.jpg -fill '#0008' -draw 'rectangle 0,0,166,26' -pointsize 20 -fill white -annotate +5+20 "$(date +%Y/%m/%d\ %H:%M)" snapshot.jpg
#convert snapshot.jpg -fill '#0008' -draw 'rectangle 0,0,250,40' -pointsize 30 -fill white -annotate +8+30 "$(date +%Y/%m/%d\ %H:%M)" snapshot.jpg


# upload to ftp server
curl --upload-file snapshot.jpg "ftp://${FTP_HOST}${FTP_PATH}/" --user "${FTP_USER}:$FTP_PASS"


# move picture with timestamped filename into the capture folder
mv snapshot.jpg "capture/snapshot_${NOW2}.jpg"

