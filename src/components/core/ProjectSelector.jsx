/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import randomstring from "../utils/generateRandomString";
import _ from "lodash";
import styled, { withTheme } from "styled-components";

/* -------------------------- Internal dependencies ------------------------- */
import Input from "./Input";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";
import * as ProjectActions from "../../actions/ProjectActions";
// import IconButton from "./IconButton";

class ProjectSelector extends React.Component {
  static defaultProps = {
    placeholder: "Add projects",
    selectionKey: null,
    max: null,
  };

  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    selectionKey: PropTypes.string,
    max: PropTypes.number,
    prepend: PropTypes.bool,
    Project: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || props.value,
      selectionKey: props.selectionKey || randomstring.generate(),
      prevKey: null,
      showSuggestions: false,
      search: props.value || "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.state.selected, prevState.selected) &&
      this.props.onChange
    ) {
      this.props.onChange(this.state.selected);
    }

    if (
      !_.isEqual(this.state.search, prevState.search) &&
      !_.isEqual(this.state.search, this.state.selected) &&
      this.state.search !== ""
    ) {
      this.getProjects({ search: this.state.search });
    }
  }

  searchKey() {
    return `${this.state.selectionKey}-${this.state.search}`;
  }

  getProjects(filter) {
    const { ProjectActions } = this.props;
    ProjectActions.listProjects(filter, this.searchKey(), this.state.prevKey);
  }

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let project = e.target.value;
      this.onSelectProject(project, e);
    }
  };

  onChange = (e) => {
    let project = e.target.value;
    this.setState({
      search: project,
      showSuggestions: !!project,
    });
  };

  onSelectProject(project, e) {
    e.preventDefault();
    this.setState({
      search: project,
      showSuggestions: false,
      selected: project,
    });
  }

  render() {
    const { max, prepend } = this.props;
    return (
      <div className="tag-input">
        {!max || max > this.state.selected.length ? (
          <div>
            <Input
              className={this.props.className}
              size={this.props.size}
              placeholder={this.props.placeholder}
              {...filterInputProps(this.props)}
              {...filterEventProps(this.props)}
              selected={this.state.selected}
              value={this.state.search}
              onFocus={() => {
                this.setState({
                  showSuggestions: !!this.state.search,
                });
              }}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
            {this.state.showSuggestions ? (
              <div className="list-group suggestions">
                {Object.values(this.props.Project.projects).map((project) => {
                  if (this.state.selected.indexOf(project.name) > -1) {
                    return null;
                  }
                  return (
                    <a
                      className="list-group-item"
                      key={project.id}
                      onClick={this.onSelectProject.bind(this, project.title)}
                    >
                      {project.title}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const SelectedContainer = withTheme(styled.div`
  ${(props) => props.theme.mixins.clearfix}
  margin-top: 24px
`);

const SelectedItem = withTheme(styled.span`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 50px;
  background: rgba(6, 46, 100, 0.04);
  border: 1px solid rgba(6, 46, 100, 0.04);
  margin-right: 16px;

  font-weight: 500;
  font-size: ${(props) => props.theme.functions.pxToRem(14)};
  line-height: ${(props) => props.theme.functions.pxToRem(17)};
  color: ${(props) => props.theme.colors["dark-blue"]};

  button {
    height: auto;
    vertical-align: baseline;
    i {
      font-size: ${(props) => props.theme.functions.pxToRem(20)};
      margin-left: 14px;
      color: ${(props) => props.theme.colors["dark-blue"]};
    }
  }
`);

function mapStateToProps(state) {
  return {
    Project: state.app.Project,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProjectActions: bindActionCreators(ProjectActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
