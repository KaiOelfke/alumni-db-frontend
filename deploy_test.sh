    

echo $TRAVIS_BRANCH

if [ $TRAVIS_BRANCH = "development" ]
then 
  grunt build-staging
  cd dist
elif [ $TRAVIS_BRANCH  = "master" ]
then
  grunt build-production
  cd dist
else 
  echo 'nothing'
fi 



