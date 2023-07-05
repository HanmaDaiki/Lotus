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

router.post('/:serviceName/:path', async (req, res) => {
  const { serviceName, path } = req.params;
  const { body, method } = req;
  const service: TService = register.services[serviceName];

  if (service.name === 'authorization') {
    try {
      const response = await axios({
        method: method.toLowerCase(), url: service.url + path, headers: {
          "Content-Type": "application/json",
        }, data: body
      });

      if (path === 'login') {
        res.cookie('token', response.data.token, { httpOnly: true });
      }

      res.send(response.data);
    } catch (err) {
      res.send(err.message);
    }
  }
});

export { router };
