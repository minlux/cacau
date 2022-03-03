#! /bin/bash
# make video from series of images using ffmpeg

ffmpeg -framerate 12 -pattern_type glob -i "snapshot_*.jpg" timelapse.mp4
