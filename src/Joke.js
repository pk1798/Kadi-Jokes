import React, { Component } from "react";
import './Joke.css'

class Joke extends Component {
    render() {
        return (
            <div className='Joke' >
                <div className='joke-meter'>
                    <svg onClick={this.props.upvote} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up Joke-upvote" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                    </svg>

                    <div className='Joke-vote' >{this.props.vote}</div>

                    <svg onClick={this.props.downvote} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down Joke-downvote" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg>
                </div>
                <div className='Joke-text'>{this.props.text}</div>
            </div >
        )
    }
}

export default Joke