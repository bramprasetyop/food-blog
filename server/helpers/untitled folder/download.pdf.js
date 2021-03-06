const Storage = require('@google-cloud/storage');

const { CLOUD_BUCKET, GCLOUD_PROJECT, KEYFILE_PATH } = process.env;

const storage = Storage({
  projectId: GCLOUD_PROJECT,
  keyFilename: KEYFILE_PATH,
});

const bucket = storage.bucket(CLOUD_BUCKET);

module.exports = {
  downloadFileFromGCS (req, res) {
    let filename = req.query.q 

    let stream = bucket.file(filename).createReadStream()

    res.writeHead(200, { 'Content-Type': 'application/pdf'})
    // stream.pipe(res)

    stream.on('data', data => {
      // let blob = new Blob(data)
      console.log(data)
      res.write(data)
    })

    stream.on('error', err => {
      console.log('error read stream', err)
      return res.status(500).json(err)
    })

    stream.on('end', () => {
      res.end()
    })
  }
}