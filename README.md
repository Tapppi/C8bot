# C8 BOT

![c8 orava](./docs/images/orava_c8.jpg)

Discord botti. MVP announcementtii ja muut random paskaa

## How to run

### Requirements
* Node 16: recommend [nvm](https://github.com/nvm-sh/nvm) on linux and macOS
* Docker desktop for compose, for local database setup
  * or docker compose directly, see [install instructions](https://docs.docker.com/compose/install/)

### Optional requirements

Optional requirements for better performance of the bot.

* Python: `brew install python`/`sudo apt install python`
* Make: `brew install make`/`sudo apt install make`
* GCC: `brew install gcc`/`sudo apt install gcc`
* G++: `brew install g++`/`sudo apt install g++`

### Useful VSCode plugins

* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [XO](https://marketplace.visualstudio.com/items?itemName=samverschueren.linter-xo)
#### Windows

See [this article](https://code.visualstudio.com/blogs/2020/07/01/containers-wsl#_new-era-of-virtualization)
for a guide on how to use VSCode, WSL2 and Docker desktop.

* [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
* [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
* [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

### Configure and run 

Copy environment variable configuration template `env.dist` to actual config
file `.env` and fill values.

```bash
# Install dependencies with npm
npm install

# Copy environment variable configuration template to actual config file
cp .env.dist .env
# Add required .env 
$EDITOR .env

# Run database
docker-compose up

# Create db schemas and seed test data
npm run migrate
npm run seed

# Run dev server with auto-reload on changes
npm run dev
```

## Deploy

The app is deployed to [Heroku](https://heroku.com) on every push to `main`.
[Find the control panel here](https://dashboard.heroku.com/apps/c8-bot)

To manually deploy:
* [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
* `heroku login`
* `heroku git:remote -a c8-bot`
* `git push heroku main`

## The boring stuff

All rights reserved to the relevant contributors. No license granted. Fuck off.

### Creators

> Tapppi  
  Gee  
  Snakkeboi  
  Zerosku  

![c8 kuningas](./docs/images/oravakuningas_c8.png)
