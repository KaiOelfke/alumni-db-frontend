    

echo $TRAVIS_BRANCH

if [ $TRAVIS_BRANCH = "development" ]
then 
  grunt build-staging
elif [ $TRAVIS_BRANCH  = "master" ]
then
  grunt build-production
else 
  echo 'nothing'
fi 



