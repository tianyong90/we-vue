#!/bin/bash
# Decrypt the private key
openssl aes-256-cbc -K $encrypted_0231095cfdaa_key -iv $encrypted_0231095cfdaa_iv -in id_rsa.enc -out ~/.ssh/id_rsa -d
# Set the permission of the key
chmod 600 ~/.ssh/id_rsa
# Start SSH agent
eval $(ssh-agent)
# Add the private key to the system
ssh-add ~/.ssh/id_rsa
# Copy SSH config
cp ssh_config ~/.ssh/config
# Set Git config
git config --global user.name "tianyong90"
git config --global user.email 412039588@qq.com
## Clone the repository
#git clone git@github.com:tianyong90/wevue.org.git .deploy_git
# Deploy to GitHub
ssh $ssh_user@$ssh_host
 cd /data/wwwroot
 git checkout master -f
 git fetch origin
 git reset --hard origin/master
 # build demo
 npm run dist
