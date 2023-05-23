# Crea Project

This project is a monorepo containing two separate applications: `api` and `store`. These applications are managed using Yarn Workspaces.

## Structure

The project has the following structure:

```bash
/crea
    /api
    /store
```

Each folder represents a Yarn workspace.

## Installing Dependencies

You can install the dependencies in all workspaces by running the following command in the root folder:

```bash
yarn install
```

## Server Settings

Make the necessary adjustments in the .env.local.sample file in the api array and save it as .env. Contains important settings for CORS and frontend-backend communication.

## Running Applications

You can start both applications at the same time by using the following command in the root folder:

```bash
yarn start
```

This command runs the `start` scripts of both the `api` and `store` applications concurrently.

## Running Individual Applications

You can start each application individually by using the following commands:

```bash
yarn workspace backend start
```

```bash
yarn workspace frontend start
```

These commands start the backend and frontend applications respectively.
