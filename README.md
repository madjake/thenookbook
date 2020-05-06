# Nookbook

A search engine & catalog for Animal Crossing New Horizons. Data comes from crowd sourced XLSX document: https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/

See a live demo: [The Nook Book](https://thenookbook.herokuapp.com/search/green)

## Status

Mainly a prototype. Rough and not very functional at this point. See [TODO](TODO.md) for things to do.

## Running Locally

```bash
npm run start-dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Requires the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

```bash
git push heroku master
```

## Using Docker


### Build it

```bash
docker build -t thenookbook .
```

### Run it

```bash
docker run -it -p 80:5000 thenookbook
```

## License

See [LICENSE](LICENSE.md) 
