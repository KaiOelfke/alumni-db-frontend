    
branch_name=$(git rev-parse --abbrev-ref HEAD)

if [ $branch_name = "development" ]
then 
  grunt build-staging
  cd dist
elif [ $branch_name  = "master" ]
then
  grunt build-production
  cd dist
else 
  echo 'nothing'
fi 



