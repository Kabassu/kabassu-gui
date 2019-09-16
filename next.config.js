const withSass = require('@zeit/next-sass')
import Cookies from 'js-cookie'

module.exports = withSass(
    {
      env: {
        kabassuServer: 'https://localhost:8080',
        kabassuResultsServer: 'https://localhost:8090',
      },
    }
  )