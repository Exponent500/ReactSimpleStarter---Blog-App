import React, { Component } from 'react';
// reduxForm is a function that is very similar to the connect helper we use from react-redux. 
// It allows this component to communicate with the formsReducee. 
// The Field Component is used to specify an input within a form.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    // This field object contains some event handlers that we need to
    // wire up into the JSX that this method will return.
    // This field object also has a meta.error object that is automatically
    // added to the field object by the validate method we have written below.
    renderField(field) {
        // Example of destructuring. It creates a new const name meta, which is equal to field.meta.
        // It also creates new consts of touched and error, which equal to field.meta.touched/error.
        const { meta: { touched, error } } = field;
        const className = `form-group ? ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    // Object that contains a bunch of event handlers (onChange, onBlur, onFocus).
                    // This removes the need to specify onChange, onFocus and onBlur handlers, to name a few.
                    {...field.input}
                />
                {/* Only show the error if the input has been 'touched' */}
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )
    }

    // Values contains the input values of each field for a form.
    onSubmit(values) {
        // Here we are not just providing createPost with values to post,
        // but also providing a callback to invoke once the post is completed.
        // This is how we make sure that we only navigate to '/' once the post is done.
        this.props.createPost(values, () => {
            // This code will automatically route us back to the root route.
            // The history object is available because this Component was provided
            // to a Route Component. This gives the Component a bunch of helpers and
            // objects it can use that are related to Navigation.
            this.props.history.push('/');
        });
    }

    render() {
        // Here we are pulling this.props' handleSubmit property and assigning it to our own handleSubmit const.
        // But how does handleSubmit get added to this.props? This is done by reduxForm method at the bottom of this file.
        const { handleSubmit } = this.props;

        return (
            // handleSubmit runs the reduxForm side of things, like validation.
            // If all looks good it then calls our onSubmit method takes a method we define and we pass it to handleSubmit.
            // We use bind because we want onSubmit to have the component's context.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {/* The name prop dictates what piece of state the user is editing  */}
                {/* The component prop is a function that returns some JSX */}
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// This function will be automatically be called for us during various
// points of the lifecycle of the Form. Most notably, whenever
// the user tries to submit the form.
// The values argument is an object that contains all the different
// values that the user has entered into all the different form inputs.
// In order to validate these inputs and communicate any possible errors back to
// redux form, we have to create an object that we return from within the validate function.
// We communicate validation errors via the errors object. If we return an empty object,
// then nothing is wrong with the form.
function validate(values) {
    const errors = {};

    // Validate the inputs from the 'values' object
    if (!values.title) {
        errors.title = "Enter a title";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit.
    // If errors has any properties, redux form assumes form is invalid.
    return errors;
}

// When we wire up the reduxForm helper to our component here,
// it adds a ton of additional properties that are passed to our component.
export default reduxForm({
    // here we are passing our validate function to reduxForm
    validate: validate,
    // the form property is the name of the form. By providing
    // a unique value here, we can ensure that if we have more
    // than one form in this component, redux form will be able to handle
    // both indepedently of one another and prevent state of one form from bleeding
    // into the state of another form.
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
