FROM yavalek/drjack-wrf3:latest

ENV BASEDIR=/root/rasp/

WORKDIR /root/

# Use local geog if buidling locally, download in the cloud if cloud build
#ADD geog.tar.gz $BASEDIR
RUN cd $BASEDIR && curl -SL https://www.dropbox.com/s/x6wcsm7c26vt67a/geog.tar.gz?dl=0 | tar -xz

RUN cp -a $BASEDIR/region.TEMPLATE $BASEDIR/BAYAREA

COPY BAYAREA/wrfsi.nl BAYAREA/rasp.run.parameters.BAYAREA $BASEDIR/BAYAREA/
COPY BAYAREA/rasp.region_data.ncl $BASEDIR/GM/
COPY BAYAREA/rasp.site.runenvironment $BASEDIR/

ENV PATH="${BASEDIR}/bin:${PATH}"

# initialize
RUN cd $BASEDIR/BAYAREA/ \
  && wrfsi2wps.pl \
  && wps2input.pl \
  && geogrid.exe

# cleanup
RUN rm -rf $BASEDIR/geog

WORKDIR /root/rasp/

VOLUME ["/root/rasp/BAYAREA/OUT/", "/root/rasp/BAYAREA/LOG/"]

CMD ["runGM", "BAYAREA"]
