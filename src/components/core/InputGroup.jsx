import PropTypes from "prop-types";
import React from "react";
import IconButton from "./IconButton";

import Input from "./Input";
import { addPropsToChildren } from "./utils/children";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

export default class InputGroup extends React.Component {
    static defaultProps = {
        isPrependText: true,
        isAppendText: true
    };

    static propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        prepend: PropTypes.object,
        append: PropTypes.object,
        isPrependText: PropTypes.bool,
        isAppendText: PropTypes.bool,
        appendFunc: PropTypes.func,
        size: PropTypes.string,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        value: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = { focus: false };
    }

    onChangeFocus(focus) {
        this.setState({ focus });
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    appendtest = context => {
        console.log(context);
        return (
            <IconButton
                onClick={() => {
                    console.log("you click the search box");
                }}
                name="x-circle"
            />
        );
    };

    render() {
        return (
            <div
                className={`input-group ${this.props.className || ""} ${
                    this.state.focus ? "state-focus" : ""
                }`}
            >
                {this.props.prepend ? (
                    <span className="input-group-prepend">
                        {this.props.isPrependText ? (
                            <span className="input-group-text">
                                {this.props.prepend}
                            </span>
                        ) : (
                            this.props.prepend
                        )}
                    </span>
                ) : null}
                <Input
                    type={this.props.type}
                    className="form-control"
                    size={this.props.size}
                    placeholder={this.props.placeholder}
                    {...filterInputProps(this.props)}
                    {...filterEventProps(this.props)}
                    onFocus={this.onChangeFocus.bind(this, true)}
                    onBlur={this.onChangeFocus.bind(this, false)}
                />
                {this.props.append ? (
                    <span className="input-group-prepend">
                        {this.props.isAppendText ? (
                            <span className="input-group-text">
                                {this.props.append}
                            </span>
                        ) : this.props.appendFunc ? (
                            this.props.value !== "" ? (
                                addPropsToChildren(this.props.append, {
                                    onClick: () => this.props.appendFunc(this)
                                })
                            ) : null
                        ) : (
                            this.props.append
                        )}
                    </span>
                ) : null}
            </div>
        );
    }
}
