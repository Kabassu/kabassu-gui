const withSass = require('@zeit/next-sass')
module.exports = withSass(
    {
      env: {
        kabassuServer: 'http://localhost:8080'
      },
    }
  )