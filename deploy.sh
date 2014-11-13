    

  # Alumni Web Client Deploy

  git remote add heroku git@heroku.com:alumni-db-frontend.git

  # Create a temp branch to deploy from.
  git checkout -b tmp-deploy

  # Un-ignoring dist for a second.
  sed '/dist/d' .gitignore > .gitignore.new && mv .gitignore.new .gitignore

  # generate dist folder
  grunt
  
  # push to heroku
  git add --all && git commit -a -m 'Deploy message.'
  
  yes | git push heroku `git subtree split --prefix dist tmp-deploy`:master --force

  # Remove tmp-deploy
  git branch -D tmp-deploy

  # Switch back to master
  git checkout master
