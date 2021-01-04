import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import Alert from "./Alert";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (!title.trim()) {
      return this.props.showAlert("Input can`n be empty");
    }
    const newPost = {
      title,
      id: Date.now().toString(),
    };

    this.props.createPost(newPost);
    this.setState({ title: "" });
  };

  ChangeHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && <Alert text={this.props.alert} />}

        <div className="form-group">
          <label htmlFor="title">Post Header</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.ChangeHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Create
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.app.alert,
  };
};

const mapDispatchToProps = {
  createPost,
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
