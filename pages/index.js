import React from 'react'
    import axios from 'axios'
    import Pusher from 'pusher-js'
    import Chart from '../components/Chart'
    import VoteButtons from '../components/VoteButtons'

    var pusher = new Pusher('app_key', {
      cluster: 'cluster',
      encrypted: true
    })
    const channel = pusher.subscribe('pet-wars')

    export default class Index extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          data: [0, 0, 0]
        }
      }

      render () {
        return (
          <div>
            <Chart data={this.state.data} />
            <VoteButtons handleVote={this.handleVote.bind(this)} />
          </div>
        )
      }
    }