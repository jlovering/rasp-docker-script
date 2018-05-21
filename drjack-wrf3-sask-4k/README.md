This is a Saskatchewan region in 4 km resolution

# Building
Make sure to download geog.tar.gz into current directory from here: https://www.dropbox.com/s/x6wcsm7c26vt67a/geog.tar.gz?dl=0
Then run:

```
docker build -f Dockerfile.local -t my-rasp-sask-4k .
```

# Extract cloud build context
```
mkdir ./Docker-cloud-context
docker container create --name extract my-rasp-sask-4k
docker container cp extract:/root/rasp/SASK ./Docker-cloud-context
docker container rm -f extract
cp SASK/rasp.region_data.ncl ./Docker-cloud-context
cp SASK/rasp.site.runenvironment ./Docker-cloud-context
```

# Local slim build
```
docker build -f Dockerfile.cloud -t my-rasp-sask-4k-slim Docker-cloud-context/
```

# Cloud slim build
```
gcloud container builds submit --config cloudbuild.yaml Docker-cloud-context
```

# Running
## Run the current day (or next if it's end of the day)

```
$ docker run -v /tmp/OUT:/root/rasp/SASK/OUT/ -v /tmp/LOG:/root/rasp/SASK/LOG/  --rm my-rasp-sask-4k
```

## Run the current day +1, +2, etc

START_HOUR environment variable can override default start hour which is 12. See ![rasp.run.parameters.SASK](SASK/rasp.run.parameters.SASK)

* START_HOUR=36 for current day +1
* START_HOUR=60 for current day +2, etc

```
docker run -v /tmp/OUT:/root/rasp/SASK/OUT/ -v /tmp/LOG:/root/rasp/SASK/LOG/ --rm -e START_HOUR=36 my-rasp-sask-4k
```
