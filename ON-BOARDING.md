# ON-BOARDING

Create a droplet with Docker on Digital Ocean

Login to your VPS via SSH
```
ssh root@999.999.99.999
```

Create first ssh key with ssh-keygen -t rsa -b 4096 -C "sztadii@gmail.com”

It will generate `id_rsa` and `id_rsa.pub`

Copy your public key with
```
pbcopy < ~/.ssh/id_rsa.pub
```
or
```
cat ~/.ssh/id_rsa.pub
```

Add your already copied key from VPS for Github
https://github.com/settings/ssh/new

Go to droplet via SSH and clone the repo in a correct folder by
```
git clone https://github.com/sztadii/shop.git
```

Create keys specific for your Github CI machine
```
ssh-keygen -t rsa -b 4096 -C "sztadii@gmail.com" -f ~/.ssh/id_rsa_github
```

Then copy the public key to the clipboard
```
pbcopy < ~/.ssh/id_rsa_github.pub
```

And save it on your VPS in authorized_keys file
```
pbpaste > ~/.ssh/authorized_keys
```
if pbpaste will be not available then
```
cat ~/.ssh/id_rsa_circleci.pub
nano ~/.ssh/authorized_keys
```

PS. When you want to add more key each of them needs to be in a separate line

Then add the private key to Github 
https://github.com/sztadii/proxy/settings/secrets

Name it for example GITHUB_PRIVATE_KEY

Then create the config file in correct folder and reuse GITHUB_PRIVATE_KEY

Please take a look on below `.github/workflows/main.yml` example

```
name: Build and deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - uses: webfactory/ssh-agent@v0.2.0
        with:
          ssh-private-key: ${{ secrets.GITHUB_PRIVATE_KEY }}
      - run: npm ci
      - run: npm run build
      - run: ssh -oStrictHostKeyChecking=no -v ${{ secrets.DIGITAL_OCEAN_VPS_USER_DOMAIN }} < .github/scripts/deploy
```

Push your changes to the origin and see new builds
