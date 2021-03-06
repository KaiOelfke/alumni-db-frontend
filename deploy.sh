    

  # Alumni Web Client Deploy
  git remote add heroku-prod git@heroku.com:alumni-db-frontend.git

  git remote add heroku-dev git@heroku.com:alumni-db-frontend-dev.git

  create_tmp_branch(){
    # Create a temp branch to deploy from.
    git checkout -b tmp-deploy

    git checkout tmp-deploy


    # Un-ignoring dist for a second.
    sed '/dist/d' .gitignore > .gitignore.new && mv .gitignore.new .gitignore
  }

  branch_name=$(git rev-parse --abbrev-ref HEAD)

  echo $branch_name

  if [ $branch_name = "development" ]
  then 
    create_tmp_branch

    # generate dist folder
    grunt build-staging
    
    # push to heroku
    git add --all && git commit -a -m 'Deploy message.'


    yes | git push heroku-dev `git subtree split --prefix dist tmp-deploy`:master --force
    # Switch back to master
    git checkout development
    # Remove tmp-deploy
    git branch -D tmp-deploy    

  elif [ $branch_name  = "master" ]
  then
    create_tmp_branch

    # generate dist folder
    grunt build-production
    
    # push to heroku
    git add --all && git commit -a -m 'Deploy message.'

    yes | git push heroku-prod `git subtree split --prefix dist tmp-deploy`:master --force
    # Switch back to master
    git checkout master
    # Remove tmp-deploy
    git branch -D tmp-deploy    
    
  else 
    echo 'wrong arguments'
  fi 



