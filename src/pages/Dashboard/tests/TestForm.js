import React, { useState, useEffect } from "react";
import { FormGroup } from "reactstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { StyledForm } from "../styles";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Icon from "../../../components/Icon";
import UserSelector from "../../../components/UserSelector";
import SingleSkillSelector from "../../../components/SingleSkillSelector";
import FieldError from "../../../components/FieldError";
import { listUsers } from "../../../actions/UserActions";

const propTypes = {
  id: PropTypes.string,
  proceed: PropTypes.func,
  result: PropTypes.object,
};

const TestForm = ({ id, proceed, result }) => {
  const [testResults, settestResults] = useState(
    result
      ? {
          id: result.id,
          user: result.user_obj.id,
          code_of_conduct: result.code_of_conduct,
          mbti_profile: result.mbti_profile,
          iq_test: result.iq_test,
          comms_check: result.comms_check,
          sa_test: result.sa_test,
          email: result.user_obj.email,
        }
      : {}
  );
  const [errors, setErrors] = useState(null);
  const User = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const [codingResults, setCodingResults] = useState(
    result
      ? result.coding_tests.map((item) => {
          return {
            skill: { id: item.skill, name: item.skill_name },
            score: item.score,
            canDelete: true,
          };
        })
      : [{ skill: null, score: "", canDelete: false }]
  );

  useEffect(() => {
    if (codingResults.length === 0) {
      addMoreCodingQns();
    }
  }, [codingResults]);

  const onChangeValue = (key, value) => {
    const newState = {};
    newState[key] = value;
    settestResults({ ...testResults, ...newState });
  };

  const onChangeField = (key, e) => {
    onChangeValue(key, e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    const error = {};
    let noCodingTest = true;

    codingResults.forEach((item) => {
      if (!(!item.skill && item.score === "")) {
        if (!item.skill) {
          error["coding"] = "You need to select Skill";
        }

        if (item.score === "") {
          error["coding"] = "You need to add Score";
        }
      }

      if (!error.coding && (item.skill || item.score !== "")) {
        noCodingTest = false;
      }
    });

    if (!error.coding && noCodingTest) {
      error["coding"] = "Add atleast one test";
    }

    if (!testResults.user) {
      error["user"] = "This field is required";
    }

    if (!testResults.code_of_conduct) {
      error["code_of_conduct"] = "This field is required";
    }

    if (!testResults.mbti_profile) {
      error["mbti_profile"] = "This field is required";
    }

    if (!testResults.iq_test) {
      error["iq_test"] = "This field is required";
    }

    if (!testResults.comms_check) {
      error["comms_check"] = "This field is required";
    }

    if (!testResults.sa_test) {
      error["sa_test"] = "This field is required";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    const data = testResults;
    data["coding_tests"] = codingResults
      .filter((item) => {
        if (!item.skill && item.score === "") {
          return false;
        } else {
          return true;
        }
      })
      .map((item) => {
        return {
          skill: item.skill.id,
          score: item.score,
        };
      });

    if (proceed) {
      proceed(data);
    }
  };

  const addMoreCodingQns = () => {
    if (codingResults.length === 1 && !codingResults[0].canDelete) {
      const newCodingResults = [...codingResults];
      newCodingResults[0] = {
        skill: newCodingResults[0].skill,
        score: newCodingResults[0].score,
        canDelete: true,
      };
      setCodingResults([...newCodingResults, { skill: null, score: "", canDelete: codingResults.length >= 1 }]);
    } else {
      setCodingResults([...codingResults, { skill: null, score: "", canDelete: codingResults.length >= 1 }]);
    }
  };

  const removeCodingResult = (index) => {
    const newCodeResultsState = [...codingResults];
    newCodeResultsState.splice(index, 1);
    setCodingResults([...newCodeResultsState]);
  };

  const selectedUser = (user) => {
    if (user) {
      if (errors && errors.user) {
        const _errors = errors;
        delete _errors.user;
        setErrors(_errors);
      }

      settestResults({
        ...testResults,
        email: user.email,
        user: user.id,
      });
    }
  };

  const userRemoved = () => {
    settestResults({ ...testResults, email: "" });
  };

  const setScore = (idx, skill, score) => {
    let canDeleteCondition = false;
    const newCodingResults = [...codingResults];

    if (skill || score !== "") {
      canDeleteCondition = true;
    }

    if (errors && errors.coding) {
      const _errors = errors;
      delete _errors.coding;
      setErrors(_errors);
    }

    newCodingResults[idx] = {
      skill: skill,
      score: score,
      canDelete: canDeleteCondition,
    };

    setCodingResults(newCodingResults);
  };

  const mbti_profiles = [
    {
      display_name: "ESTJ",
      value: "estj",
    },
    {
      display_name: "ISTJ",
      value: "istj",
    },
    {
      display_name: "ENTJ",
      value: "entj",
    },
    {
      display_name: "INTJ",
      value: "intj",
    },
    {
      display_name: "ESTP",
      value: "estp",
    },
    {
      display_name: "ISTP",
      value: "istp",
    },
    {
      display_name: "ENTP",
      value: "entp",
    },
    {
      display_name: "INTP",
      value: "intp",
    },
    {
      display_name: "ESFJ",
      value: "esfj",
    },
    {
      display_name: "ISFJ",
      value: "isfj",
    },
    {
      display_name: "ENFJ",
      value: "enfj",
    },
    {
      display_name: "INFJ",
      value: "infj",
    },
    {
      display_name: "ESFP",
      value: "esfp",
    },
    {
      display_name: "ISFP",
      value: "isfp",
    },
    {
      display_name: "ENFP",
      value: "enfp",
    },
    {
      display_name: "INFP",
      value: "infp",
    },
  ];

  const getUsers = (filter, searchKey, prevKey) => {
    listUsers(filter, searchKey, prevKey)(dispatch);
  };

  return (
    <StyledForm id={id} onSubmit={(e) => onSave(e)}>
      <div className="row">
        <div className="col-md-6">
          <FormGroup>
            <label>
              Full name
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.user && <FieldError message={errors.user} />}
            <UserSelector
              label={false}
              type="singular"
              max={1}
              variant="bottom"
              placeholder="Full name"
              selected={result ? [result.user_obj] : []}
              onChange={(users) => selectedUser(users[0])}
              userRemoved={(user) => userRemoved(user)}
              userType="developer"
              disabled={result ? true : false}
              User={User}
              listUsers={getUsers}
            />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup>
            <label>Email address</label>
            <Input type="text" value={testResults.email} disabled placeholder="Email address" required />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <Divider></Divider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label>
            Coding tests
            <LabelStyle>
              <span className="label-style">*</span>
            </LabelStyle>
          </label>
          {errors && errors.coding && <FieldError message={errors.coding} />}
        </div>
        <div className="col-md-6">
          <StyledA onClick={() => addMoreCodingQns()}>
            <Icon name="round-add" /> Add more
          </StyledA>
        </div>
        {codingResults.map((result, i) => (
          <div className="col-md-6" key={`code-result-${i}`}>
            <CodingTestWrapper>
              <div className="input-row">
                <SingleSkillSelector
                  prepend={null}
                  placeholder="Type to search and select..."
                  onChange={(skill, score) => {
                    setScore(i, skill, score);
                  }}
                  removeSkill={(idx) => removeCodingResult(idx)}
                  allowDelete={result.canDelete}
                  position={i}
                  skill={result.skill}
                  score={result.score}
                  excludeSkills={codingResults.filter((item) => item.skill).map((item) => item.skill.id)}
                  type="multiple"
                />
              </div>
            </CodingTestWrapper>
          </div>
        ))}
        <div className="col-md-12">
          <Divider></Divider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <FormGroup>
            <label>
              Comms Check
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.comms_check && <FieldError message={errors.comms_check} />}
            <CustomSelect>
              <Select
                placeholder="Comms Check"
                selected={testResults.comms_check}
                onChange={(value) => onChangeValue("comms_check", value)}
              >
                <option value="very_good">Very good</option>
                <option value="good">Good</option>
                <option value="pass">Pass</option>
                <option value="poor">Bad</option>
              </Select>
              <Icon name="rounded-keyboard-arrow-down" size="sm" />
            </CustomSelect>
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup>
            <label>
              MBTI Profile
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.mbti_profile && <FieldError message={errors.mbti_profile} />}
            <CustomSelect>
              <Select
                placeholder="Profiles"
                selected={testResults.mbti_profile}
                onChange={(value) => onChangeValue("mbti_profile", value)}
              >
                {mbti_profiles.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.display_name}
                  </option>
                ))}
              </Select>
              <Icon name="rounded-keyboard-arrow-down" size="sm" />
            </CustomSelect>
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormGroup>
            <label>
              IQ Test
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.iq_test && <FieldError message={errors.iq_test} />}
            <Input
              type="number"
              min="0"
              value={testResults.iq_test}
              onChange={(e) => onChangeField("iq_test", e)}
              placeholder="Enter score"
              step={1}
            />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup>
            <label>
              SA Test
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.sa_test && <FieldError message={errors.sa_test} />}
            <Input
              type="number"
              min="0"
              max="100"
              value={testResults.sa_test}
              onChange={(e) => onChangeField("sa_test", e)}
              placeholder="SA test"
              step={1}
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormGroup>
            <label>
              Code of Conduct
              <LabelStyle>
                <span className="label-style">*</span>
              </LabelStyle>
            </label>
            {errors && errors.code_of_conduct && <FieldError message={errors.code_of_conduct} />}
            <Input
              type="number"
              min="0"
              max="100"
              value={testResults.code_of_conduct}
              onChange={(e) => onChangeField("code_of_conduct", e)}
              placeholder="Enter score"
              step={1}
            />
          </FormGroup>
        </div>
      </div>
    </StyledForm>
  );
};

const CustomSelect = styled.div`
  position: relative;
  select {
    padding-right: 35px;
    /* for Firefox */
    -moz-appearance: none;
    /* for Chrome */
    -webkit-appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  i {
    font-size: 10px;
    margin: auto;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8f9bb3;

    &.select-icons {
      top: 40%;
    }
  }
`;

const StyledA = styled.a`
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  float: right;
  color: #062e64;

  &.hover {
    text-decoration: none;
  }

  i {
    vertical-align: initial;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #edf1f7;
  margin-bottom: 24px;
`;

const CodingTestWrapper = styled.div`
  .input-row {
    display: flex;
    justify-content: space-between;

    input,
    textarea,
    select {
      background: #ffffff;
      border: 1px solid rgba(194, 204, 217, 0.25);
      box-sizing: border-box;
      box-shadow: none;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 24px;
      color: #3e4857;
    }

    select {
      width: 150px;
    }
    input {
      width: 120px;
    }

    button {
      i {
        color: #8f9bb3;
        font-size: 18px;
      }
      &:disabled i {
      }
    }
  }
`;

const LabelStyle = styled.span`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
`;

TestForm.propTypes = propTypes;

export default TestForm;
