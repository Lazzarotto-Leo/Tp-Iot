import { fluxInteger, InfluxDB, Point } from '@influxdata/influxdb-client'
require('dotenv').config()
console.log(process.env)

/** Environment variables **/
const url : string = process.env.INFLUX_URL!;
const token : string  = process.env.INFLUX_TOKEN!;
const org : string = process.env.INFLUX_ORG!;
const bucket : string = process.env.INFLUX_BUCKET!;


const express = require('express')
const app = express()
const port = 8000
const hexToDecimal = (hex: any) => parseInt(hex, 16)

app.post('/api/humidity', (req : any, res : any) => {
    let data = '';
    req.on('data', (chunk : any) => {
      data += chunk;
    });
    req.on('end', () => {
      const frame = JSON.parse(data);
      let dec;
      if (frame.data.slice(0,2).localeCompare('0a')){
        dec = hexToDecimal((frame.data).slice(2,6)) / 10;
      }else if (frame.data.slice(0,2).localeCompare('14')){
        dec = hexToDecimal((frame.data).slice(2)) / 10;
      }else{
        dec = 1000;
      }

      const influxDB = new InfluxDB({url, token});
      const writeApi = influxDB.getWriteApi(org, bucket);
      const point1 = new Point('humidity');
      if ( dec < 30){
        point1
        .tag('sensor_humidity', 'HM01')
        .floatField('value', dec)
        console.log(` ${point1}`)
      }
      
      writeApi.writePoint(point1)

      writeApi.close().then(() => {
        console.log('WRITE FINISHED')
      })
      
    })
})

app.post('/api/temperature', (req : any, res : any) => {
    let data = '';
    req.on('data', (chunk : any) => {
      data += chunk;
    });
    req.on('end', () => {
      const frame = JSON.parse(data);
      let dec;
      if (frame.data.slice(0,2).localeCompare('1e')){
        dec = hexToDecimal((frame.data).slice(2,6)) / 10;
      }else if (frame.data.slice(0,2).localeCompare('28')){
        dec = hexToDecimal((frame.data).slice(2)) / 10;
      }else{
        dec = 1000;
      }

      const influxDB = new InfluxDB({url, token});
      const writeApi = influxDB.getWriteApi(org, bucket);
      const point2 = new Point('temperature');
      if ( dec < 30){
        point2
        .tag('sensor_temparature', 'TP01')
        .floatField('value', dec)
        console.log(` ${point2}`)
      }
      
      writeApi.writePoint(point2)

      writeApi.close().then(() => {
        console.log('WRITE FINISHED')
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

