This is a BayArea region in 4 km resolution

# Building
Make sure to download geog.tar.gz into current directory from here: https://www.dropbox.com/s/x6wcsm7c26vt67a/geog.tar.gz?dl=0
Then run:

```
docker build -f Dockerfile.local -t my-rasp-bayarea-4k .
```

# Extract cloud build context
```
mkdir ./Dockercloud/Dockercloud-context
docker container create --name extract my-rasp-bayarea-4k
docker container cp extract:/root/rasp/BAYAREA ./Dockercloud/Dockercloud-context
docker container rm -f extract
find Dockercloud/Dockercloud-context -type l -exec rm -f {} \;
cp BAYAREA/rasp.region_data.ncl ./Dockercloud/Dockercloud-context
cp BAYAREA/rasp.site.runenvironment ./Dockercloud/Dockercloud-context
```

# Local slim build
```
docker build -f Dockercloud/Dockerfile.cloud -t my-rasp-bayarea-4k-slim Dockercloud/
```

# Local Cloud build test
```
cd Dockercloud && container-builder-local --config=cloudbuild.yaml --dryrun=false .
```

# Cloud slim build
```
cd Dockercloud && gcloud container builds submit --config cloudbuild.yaml .
```

# Running
## Run the current day (or next if it's end of the day)

```
$ docker run -v /tmp/OUT:/root/rasp/BAYAREA/OUT/ -v /tmp/LOG:/root/rasp/BAYAREA/LOG/  --rm my-rasp-bayarea-4k
```

## Run the current day +1, +2, etc

START_HOUR environment variable can override default start hour which is 12. See ![rasp.run.parameters.BAYAREA](BAYAREA/rasp.run.parameters.BAYAREA)

* START_HOUR=36 for current day +1
* START_HOUR=60 for current day +2, etc

```
docker run -v /tmp/OUT:/root/rasp/BAYAREA/OUT/ -v /tmp/LOG:/root/rasp/BAYAREA/LOG/ --rm -e START_HOUR=36 my-rasp-bayarea-4k
```
