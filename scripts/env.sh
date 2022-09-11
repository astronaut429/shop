#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ -z $CODEBUILD_CI ]
then
  export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
  export INFRA_BUCKET_NAME=$LOCAL_INFRA_BUCKET_NAME

fi

export SHOP_AWS_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
export SHOP_ENV_NAME=$PROJECT-$GIT_BRANCH-$SHOP_AWS_ACCOUNT-$AWS_DEFAULT_REGION
export SHOP_APP_STACK_NAME=$SHOP_ENV_NAME-app
export EPSILON_MEDIA_BUCKET_NAME=$SHOP_APP_STACK_NAME-media-bucket
export WEBSITE_HOSTING_BUCKET_NAME=$SHOP_APP_STACK_NAME-website-bucket