ENVIRONMENT=$1
CONTAINER_REGISTRY=$2
CONTAINER_IMAGE=$3

if [[ $ENVIRONMENT == "feature/jenkins" ]];
then
    ENVIRONMENT="develop"
fi

CONTAINER_NAME="recipe-app-${ENVIRONMENT}"
ENV_FILE="${ENVIRONMENT}.env"

if [[ $(docker container ls -q --filter name=${CONTAINER_NAME}) ]];
then
            echo "found running container, killing thing"
            docker stop ${CONTAINER_NAME}
else
        echo "no running container, starting new one"
fi
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 253520709108.dkr.ecr.us-west-2.amazonaws.com
docker pull ${CONTAINER_REGISTRY}/${CONTAINER_IMAGE}

# TODO dynamically set ports based on app/env
docker run -p 8087:80 --rm --env-file=${ENVIRONMENT}.env --name ${CONTAINER_NAME} --detach ${CONTAINER_REGISTRY}/${CONTAINER_IMAGE}