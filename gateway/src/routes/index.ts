import express from 'express';
import axios from 'axios';
import register from './registry.json';

const router = express.Router();

type TService = {
  url: string;
  name: string;
  port: number;
  host: string;
}

router.get('/:serviceName', async (req, res) => {
  const { serviceName } = req.params;
  const service: TService = register.services[serviceName];

  const response = await axios.get(service.url);
  console.log(response.data);
  return JSON.stringify(response.data);
});

router.post('/:serviceName/:path', async (req, res) => {
  try {
    const { serviceName, path } = req.params;
    const body = req.body;
    const service: TService = register.services[serviceName];
    console.log(path, req.body);
    
    const response = await axios.post(service.url + path, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(path === 'login') {
      console.log(response.data)
      res.cookie('token', response.data.token, { httpOnly: true });
    }

    res.send(response.data);
  } catch(err) {
    res.send(err);
  }
});

export { router };