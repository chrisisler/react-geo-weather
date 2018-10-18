import React, { Component } from 'react'
import { render } from 'react-dom'
import cache from 'one-cache'

import './index.css'
import * as serviceWorker from './serviceWorker'
import { key } from './key'

let createURL = ({ latitude, longitude }) =>
  'https://api.worldweatheronline.com/premium/v1/weather.ashx'
  + `?key=${key}`
  + `&q=${latitude},${longitude}`
  + '&format=json'

class App extends Component {
  state = {
    temp: 42
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(async position => {
      let { latitude, longitude } = position.coords
      let { data } = await cache('weather-cache', async () => {
        try {
          let response = await fetch(createURL({ latitude, longitude }))
          if (response.ok) {
            return response.json()
          }
        } catch (error) {
          console.error(error)
        }
      })
      console.log(data.weather)
    })
  }

  render() {
    let { temp } = this.state
    return (
      <main className="center">
        <h1>
          {temp + 'F'}
        </h1>
      </main>
    )
  }
}

render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
