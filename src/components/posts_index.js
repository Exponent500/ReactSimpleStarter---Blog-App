import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/';

class PostsIndex extends Component {
    // This is a React lifecycle method that is automatically called by React
    // when this component first shows up on the DOM.
    // This is ideal for something we want to do once, when the component first shows up.
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
       return  _.map(this.props.posts, post => {
           return (
               <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
               </li>
           )
       })
    }

    render() {
        return (
            <div>
                <div class="text-xs-right">
                    {/* the to prop sets what route the user will navigate to when this link is clicked */}
                    <Link className="btn btn-primary" to="/posts/new">
                        Add A post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// Here we are not specifying a mapDispatchToProps function as the second
// argument for the connect method. But in doing this the Component
// still has access to a fetchPosts property on it's props.

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);