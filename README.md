To build the back-end service execute the below command on the commandline
docker image build -f ./back-end.Dockerfile -t back-end:latest .

clear all docker build cache
docker builder prune -a

complete clean of all docker space
docker system prune -a

to bring up the system use
docker-compose -f docker-compose-jobjack-service.yml up