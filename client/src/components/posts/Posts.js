import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import Spinner from '../common/Spinner'
import { getPosts } from '../../actions/postActions'
import PostFeed from './PostFeed'

export class Posts extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired    
  }

  componentDidMount() {
      this.props.getPosts();
  }

  render() {

    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
        postContent = <Spinner />
    } else {
        postContent = <PostFeed posts={posts} />
    }

    return (
      <div className='feed'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm />
                    {postContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post,  
})

const mapDispatchToProps = {
    getPosts: getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
