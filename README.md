# Humidity and Temperature Server

This server receives HTTP POST requests with humidity and temperature data in hexadecimal format, converts it to decimal, and writes it to an InfluxDB database.

## Prerequisites

- Node.js
- TypeScript
- InfluxDB account and database set up
- dotenv
- express
- ts-node

## Make .env

Create a new file name ".env"

In this file put : 

INFLUX_URL=http://localhost:8086
INFLUX_TOKEN=eZVgKLU5nfyQNIZwNWCXO6951aOSAdQnGS_4EsK9qthqp5FJ7O79XsuNt_F7qyg1d6mTECwefPaq3hAmDNXCSQ==
INFLUX_ORG=keyce
INFLUX_BUCKET=leo

## Run project

- npm i

And then for run project : 
-  npx ts-code app.ts


