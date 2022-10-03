// crear una instancia de Express para crear nuestra aplicación de servidor
let express = require('express');

let bodyParser = require('body-parser');

let cors = require('cors');

let webpush = require('web-push');

let app = express();

app.use(bodyParser.urlencoded({
  extended: false

}));

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) =>
{
  res.send('Un mensaje de vuelta al usuario');
});

app.post('/suscripcion', (req, res) =>
{
  let body = req.body;

  webpush.setVapidDetails(
    'mailto: jbarrientos2@tenaris.com',
    'BGMHrsaxlagCaajXMhJUc94bFKgBLcTLFRxcYsDCKGMfyj2eEt-8DuzYmQdOQngAoRGCiBt0ZOLUqbwvvBgXSh8',
    'ENz56nQgM0mnBOXg-jORhpveR5YeJHo55MRq1jCRzic'
  )

  let payload = JSON.stringify(
    {
      "notification": {
        "title": "Personal API",
        "body": "Gracias por suscribirte",
        "icon": "https://user-images.githubusercontent.com/48891420/55279922-a70e4300-52ec-11e9-9b0c-893752ab791f.png"
      }
    });

    console.table(payload);

    Promise.resolve(webpush.sendNotification(body, payload)).then(()=>
    {
      res.status(200).json({
        mensaje: "Notificacion enviada con éxito"
      });
    }).catch(err =>
      {
        console.log("Error en el servidor", err);
        res.status(500);
      });
});

app.listen(3000, () =>
{
  console.log('Servidor de notificaciones push listo y escuchando en el puerto 3000...')
});
