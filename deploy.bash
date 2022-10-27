FILE_DIR=$(dirname "$0")
DEPLOY_DIR="syneidesis"

cd $FILE_DIR
echo "Syncing deploy files"
rsync --progress --delete -a docker www $1:./$DEPLOY_DIR/
ssh $1 "cd ./$DEPLOY_DIR/docker && bash deploy-stack.bash"
