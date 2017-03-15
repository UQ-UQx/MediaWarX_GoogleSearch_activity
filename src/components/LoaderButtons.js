import React from "react"
import { connect } from "react-redux"
import { fetchTweets } from "../store/actions/tweetsActions"
import { fetchCallData } from "../store/actions/ltiActions"
import { Icon } from "react-fa"

@connect((store) => {
        return {
            tweetsFetched: store.tweets.fetched,
            tweetsFetching: store.tweets.fetching
        }
})
export default class LoaderButtons extends React.Component {

    fetchTweetsAndCallData(){
        this.props.dispatch(fetchTweets())
        this.props.dispatch(fetchCallData())
    }
    render(){
        console.log(this.props);

        const { tweetsFetched, tweetsFetching } = this.props;

        var icon = null;
        if(tweetsFetching){
            icon = <Icon pulse name="spinner" />;
        }else{
            icon = <Icon name="twitter" />;

        }

        if(!tweetsFetched){
            return (
                <button className="btn btn-primary"
                        onClick={this.fetchTweetsAndCallData.bind(this)}>

                Load Tweets {icon}
                </button>
            )
        }else{
            return <div>Tweets Loaded {icon}</div>
        }

    }
}
