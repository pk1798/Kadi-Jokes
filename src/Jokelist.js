import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import { v4 as uuidv4 } from 'uuid';
import './Jokelist.css'

class Jokelist extends Component {
    static defaultProps = {
        totaJokes: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'), isLoading: false }
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke))

        this.handleClick = this.handleClick.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.getJokes = this.getJokes.bind(this)
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes() {
        let jokes = []
        while (jokes.length < this.props.totaJokes) {
            let joke = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
            if (!this.seenJokes.has(joke.data.joke)) {
                jokes.push({ joke: joke.data.joke, vote: 0, id: uuidv4() })
            } else {
                console.log('Duplicate Found!')
            }

        }
        this.setState(st => ({
            jokes: [...st.jokes, ...jokes],
            isLoading: false
        }))

        window.localStorage.setItem('jokes', JSON.stringify(jokes))
    }

    handleClick() {
        this.setState({ isLoading: true }, this.getJokes)
        console.log(this.state.jokes)
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, vote: j.vote + delta } : j
            )
        }), () =>
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='Jokelist-loader'>
                    <div className="loading"></div>
                </div >
            )
        }
        let sortedJokes = this.state.jokes.sort((a, b) => b.vote - a.vote)
        return (
            <div className='Jokelist-container'>
                <div className='Jokelist-sidebar'>
                    <button className='Jokelist-button' onClick={this.handleClick}>Get New Jokes</button>
                </div>

                <div className='Jokelist'>
                    {sortedJokes.map(j =>
                        <Joke text={j.joke} vote={j.vote} key={j.id} upvote={() => this.handleVote(j.id, 1)} downvote={() => this.handleVote(j.id, -1)} />)
                    }
                </div>

            </div>
        )
    }
}


export default Jokelist