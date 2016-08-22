if [ $TRAVIS_BRANCH = "staging" ]
then 
  NODE_ENV=development
  gulp build
elif [ $TRAVIS_BRANCH  = "production" ]
then
  NODE_ENV=production
  gulp build
else 
  echo 'nothing'
fi 

