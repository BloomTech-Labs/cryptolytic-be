module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://lgyzosthkchxiz:980c097f66f595ccd6f897fef0033c0be33e6feb0c134b6c0d3e02bad1400a39@ec2-107-21-201-238.compute-1.amazonaws.com:5432/d3m0vpf3mmptbb",
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
