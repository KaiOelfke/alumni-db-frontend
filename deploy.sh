if [ $TRAVIS_BRANCH = "development" ]
then 
  NODE_ENV=staging gulp build
  
  echo $NODE_ENV
elif [ $TRAVIS_BRANCH  = "master" ]
then
  NODE_ENV=production gulp build
  
else 
  echo 'nothing'
fi 

