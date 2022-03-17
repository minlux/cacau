#!/bin/bash
#Infinite loop, executed every 5 minutes. Hit CTRL+C to stop
for (( ; ; ))
do
   ./cacau.sh
   sleep 5m
done
