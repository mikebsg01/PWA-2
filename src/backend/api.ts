import * as express from 'express';
import { Logro } from './models/logro';

const router = express.Router();

router.route("/logros")
  .post((req, res) => {
    // Guardar nuevo logro en la base de datos
    var input = req.body;

    console.log(">>> POST \"/api/logros\" - Request: ", JSON.stringify(input, null, 4));

    const logro = new Logro({
      title: input.title,
      description: input.description,
      author: input.author
    });

    logro.save()
      .then((doc) => {
        res.json({
          success: true,
          data: doc
        });
      }, (err) => {
        /**
         * if (err.name === 'MongoError' && err.code === 11000) {
         * // Duplicate username (code = 11000)
         * return res.status(500).send({ succes: false, message: 'User already exist!' });
         * }
        */

        res.status(500).send(err);
      });
  });

export const RouterApi = router;