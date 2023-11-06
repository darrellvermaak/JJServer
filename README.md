This is the back-end server for the file-browser front end application

The back-end service and the file-browser (see the README.md in the file-browser repository for notes on how to build the file-browser image) must be built before running the docker-compose command.

To build the back-end service execute the below command on the commandline
docker image build -f ./dockerise/back-end.Dockerfile -t back-end:latest .

after building the back-end and the file-browser you can bring up the service in docker desktop.
to bring up the system (service) in docker desktop use the following on the command line
docker-compose -f docker-compose-jobjack-service.yml up

In case of problems the below cleaning scripts can be used. BEWARE - THESE WILL CLEAN **ALL** images, volumes etc within your docker environment.

clear all docker build cache
docker builder prune -a

complete clean of all docker space
docker system prune -a
