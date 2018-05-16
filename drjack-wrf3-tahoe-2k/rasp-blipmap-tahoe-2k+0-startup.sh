#!/bin/bash

#Modify these for run
DAY_OFFSET=0
L_TZ='America/Los_Angeles'
DOCKER_IMAGE='gcr.io/wrf-blipmaps/rasp-tahoe-2k:latest'
SITE_NAME='TAHOE'
L_USER='jon_lovering'

#Generated Params
RUN_DATE=`TZ=$L_TZ date "+%Y%m%d"`
FCST_DATE=`TZ=$L_TZ date --date="TZ=\"$L_TZ\" 00:00 $DAY_OFFSET day" "+%Y%m%d"`
let SH=12+$DAY_OFFSET*24

GSUTIL_CMD='python /mnt/stateful_partition/bin/gsutil/gsutil'

# Run the model
docker run \
    --log-driver=gcplogs \
    --net="host" \
    -v=/var/run/docker.sock:/var/run/docker.sock \
    -v=/etc/profile.d:/host/etc/profile.d \
    -v=/dev:/dev \
    -v=/mnt:/mnt \
    -v=/proc:/host_proc \
    -v /tmp/OUT:/root/rasp/${SITE_NAME}/OUT/ \
    -v /tmp/LOG:/root/rasp/${SITE_NAME}/LOG/ \
    -e START_HOUR=$SH \
    ${DOCKER_IMAGE}

# Upload the output
su $L_USER -c "$GSUTIL_CMD -m cp /tmp/OUT/* gs://bucket-blipmap-tahoe/${RUN_DATE}/${FCST_DATE}/FCST/"

# Save logs
tar -C /tmp/LOG/ -czvf /tmp/${RUN_DATE}_${FCST_DATE}_logs.tgz .
su $L_USER -c "$GSUTIL_CMD -m cp /tmp/${RUN_DATE}_${FCST_DATE}_logs.tgz gs://bucket-blipmap-tahoe/logs/"

# Shutdown
shutdown -h now
