    

  # Alumni Web Client Deploy

  git remote add web-client-heroku git@heroku.com:alumni-db-frontend.git

  # Remove tmp-deploy
  git branch -D tmp-deploy
  # Create a temp branch to deploy from.
  git checkout -b tmp-deploy
  # Un-ignoring dist for a second.
  sed '/dist/d' .gitignore > .gitignore.new && mv .gitignore.new .gitignore
  # generate dist folder
  grunt
  
  git add --all && git commit -a -m 'Deploy message.'
  
  yes | git push heroku `git subtree split --prefix dist tmp-deploy`:master --force
