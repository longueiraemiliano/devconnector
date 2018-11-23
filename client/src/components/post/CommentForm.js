import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addComment } from '../../actions/postActions'

export class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
       text: '',
       errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({
              errors: nextProps.errors
          })
      } else {
        this.setState({
            errors: {}
        })
      }
  }

  onSubmit(e) {
      e.preventDefault();

      const { user } = this.props.auth;
      const { postId } = this.props;

      const newComment = {
          text: this.state.text,
          name: user.name,
          avatar: user.avatar
      }

      this.props.addComment(postId, newComment);
      this.setState({
          text: ''
      });
  }

  onChange(e) {
    this.setState({
        [e.target.name] : e.target.value
    });
  }

  render() {

    const { errors } = this.state;

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">Say Somthing...</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextAreaFieldGroup
                        placeholder="Reply to Post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">
                        Submit
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
})

const mapDispatchToProps = {
    addComment: addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
