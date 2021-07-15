/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import randomstring from "../utils/generateRandomString";
import _ from "lodash";

import InputGroup from "./InputGroup";
import Icon from "./Icon";

import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

import * as ProgressEventActions from "../../actions/ProgressEventActions";
import { PROGRESS_EVENT_TYPE_MILESTONE } from "../../actions/utils/api";

const VARIANT_BOTTOM = "bottom";

class MilestoneSelector extends React.Component {
    static defaultProps = {
        type: PROGRESS_EVENT_TYPE_MILESTONE,
        placeholder: "Search by title",
        selectionKey: null,
        max: 1,
        filters: null
    };

    static propTypes = {
        type: PropTypes.string,
        variant: PropTypes.string,
        className: PropTypes.string,
        selected: PropTypes.array,
        onChange: PropTypes.func,
        size: PropTypes.string,
        placeholder: PropTypes.string,
        selectionKey: PropTypes.string,
        account_type: PropTypes.string,
        max: PropTypes.number,
        filters: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || props.value || [],
            selectionKey: props.selectionKey || randomstring.generate(),
            prevKey: null,
            showSuggestions: false,
            search: ""
        };
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, snapShot) {
        if (
            !_.isEqual(this.state.selected, prevState.selected) &&
            this.props.onChange
        ) {
            this.props.onChange(this.state.selected);
        }

        if (!_.isEqual(this.state.search, prevState.search)) {
            this.getMilestones({
                search: this.state.search,
                account_type: this.props.account_type
            });
        }
    }

    searchKey() {
        return `${this.state.selectionKey}-${this.state.search}`;
    }

    getMilestones(filter) {
        const { ProgressEventActions } = this.props;
        ProgressEventActions.listProgressEvents(
            { type: this.props.type, ...(this.props.filters || {}), ...filter },
            this.searchKey(),
            this.state.prevKey
        );
    }

    onChange(e) {
        let title = e.target.value;
        this.setState({ search: title, showSuggestions: !!title });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.selected, this.props.selected)) {
            this.setState({ selected: nextProps.selected });
        }
    }

    onSelectMilestone(user, e) {
        e.preventDefault();
        this.setState({
            search: "",
            showSuggestions: false,
            selected: Array.from(new Set([...this.state.selected, user]))
        });
    }

    onRemoveMilestone(user, e) {
        e.preventDefault();
        let idx = this.state.selected
            .map(user => {
                return user.id;
            })
            .indexOf(user.id);
        if (idx > -1) {
            this.setState({
                selected: Array.from(
                    new Set([
                        ...this.state.selected.slice(0, idx),
                        ...this.state.selected.slice(idx + 1)
                    ])
                )
            });
        }
    }

    renderSelection() {
        if (this.state.selected && this.state.selected.length) {
            return (
                <SelectedItems className="selected">
                    {this.state.selected.map(milestone => {
                        return (
                            <div
                                key={`user-${milestone.id}`}
                                className="selected-item"
                            >
                                {milestone.title}
                                <a
                                    onClick={this.onRemoveMilestone.bind(
                                        this,
                                        milestone
                                    )}
                                    className="close"
                                >
                                    <Icon name="close" />
                                </a>
                            </div>
                        );
                    })}
                </SelectedItems>
            );
        }
        return null;
    }

    render() {
        const {
            max,
            ProgressEvent: { ids, progress_events }
        } = this.props;

        return (
            <div className="tag-input">
                {this.props.variant !== VARIANT_BOTTOM
                    ? this.renderSelection()
                    : null}
                {!max || max > this.state.selected.length ? (
                    <div>
                        <InputGroup
                            className={this.props.className}
                            append={<Icon name="arrow-down" />}
                            size={this.props.size}
                            placeholder={this.props.placeholder}
                            {...filterInputProps(this.props)}
                            {...filterEventProps(this.props)}
                            selected={this.state.selected}
                            value={this.state.search}
                            onFocus={() => {
                                this.setState({
                                    showSuggestions: !!this.state.search
                                });
                            }}
                            onChange={this.onChange.bind(this)}
                        />

                        {this.state.showSuggestions && (
                            <div className="list-group suggestions">
                                {(ids[this.searchKey()] || []).map(id => {
                                    let milestone = progress_events[id] || {};
                                    if (this.state.selected.indexOf(id) > -1) {
                                        return null;
                                    }
                                    return (
                                        <a
                                            className="list-group-item"
                                            key={`user-${milestone.id}`}
                                            onClick={this.onSelectMilestone.bind(
                                                this,
                                                milestone
                                            )}
                                        >
                                            {milestone.title}
                                        </a>
                                    );
                                })}
                                {ids[this.searchKey()] &&
                                    ids[this.searchKey()].length === 0 && (
                                        <a className="list-group-item">
                                            No Milestones
                                        </a>
                                    )}
                            </div>
                        )}
                    </div>
                ) : null}
                {this.props.variant === VARIANT_BOTTOM
                    ? this.renderSelection()
                    : null}
            </div>
        );
    }
}

const SelectedItems = styled.div`
    .selected-item {
        font-size: 16px;
        color: #8f9bb3;
        margin: 0 !important;
        padding: 8px 16px !important;
        a {
            font-size: 12px !important;
            margin-top: 5px;
        }
    }
`;

function mapStateToProps(state) {
    return {
        ProgressEvent: state.app.ProgressEvent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ProgressEventActions: bindActionCreators(ProgressEventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneSelector);
