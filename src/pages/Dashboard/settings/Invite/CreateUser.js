import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ContentSection } from "../../../../utils/styles";
import { useDispatch } from "react-redux";
import InviteContainer from "./InviteContainer";
import Label from "../../../../components/Label";
import { Input } from "reactstrap";
import * as inviteActions from "../../../../redux/actions/InvitesActions";
import { FormGroup } from "react-bootstrap";
import { getFormData } from "../../../../utils/forms";
import { success } from "../../../../utils/actions";
import Select from "../../../../components/Select";
import * as actionTypes from "../../../../configs/constants/ActionTypes";
import Alert from "../../../../utils/alert";
import { AnimatedButton } from "../../../../components/Button";

const CreateUser = (props) => {
  const [countries, setCountries] = useState([...(props.countries || [])]);
  const [userCountry, setUserCountry] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    import("../../../../components/countries").then(({ countries }) => {
      setCountries(countries);
    });
  }, []);

  const onSave = async (e) => {
    e.preventDefault();

    let form = document.querySelector("form");
    let formdata = new FormData(form);
    let data = getFormData(formdata);

    data["username"] = data.email;
    data["company"] = {
      name: data.company,
      street: data.street,
      plot_number: data.plot_number,
      city: data.city,
      postal_code: data.postal_code,
      country: data.country,
      vat_number: data.vat_number,
    };

    return inviteActions
      .createUser({ ...data })
      .then(function () {
        dispatch(success(actionTypes.SET_BUTTON, false));
        Alert("Client Successfully Created.");
        form.reset();
      })
      .catch(function (error) {
        dispatch(success(actionTypes.SET_BUTTON, false));
        if (error.response.data && error.response.data["email"]) {
          Alert(error.response.data["email"][0], false);
        }
      });
  };

  return (
    <InviteContainer>
      <ContentSection style={{ paddingTop: "0" }}>
        <form onSubmit={onSave}>
          <input type="hidden" name="source" value="3" />
          <input type="hidden" name="type" value="2" />
          <Label name="Email Address">
            <Input
              placeholder="eg. bart@tunga.io"
              name="email"
              aria-label="email-input"
              required
            />
          </Label>
          <Label name="First Name">
            <Input
              placeholder="Enter first name"
              name="first_name"
              aria-label="first_name-input"
              required
            />
          </Label>
          <Label name="Last Name">
            <Input
              placeholder="Enter last name"
              name="last_name"
              aria-label="last_name-input"
              required
            />
          </Label>
          <Label name="Company name">
            <Input
              placeholder="Enter name of company"
              name="company"
              aria-label="company-input"
              required
            />
          </Label>
          <Label name="VAT Number: " required={false}>
            <Input
              placeholder="VAT Number"
              name="vat_number"
              aria-label="vat_number-input"
            />
          </Label>
          <div className="row">
            <div className="col-sm-6" aria-label="label">
              <FormGroup>
                <label className="control-label" aria-label="street">
                  Street
                  <span className="label-style">*</span>
                </label>
                <Input
                  placeholder="Enter street name"
                  name="street"
                  aria-label="street-input"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-sm-3" aria-label="label">
              <FormGroup>
                <label className="control-label" aria-label="Number/Plot">
                  Number/Plot
                  <span className="label-style">*</span>
                </label>
                <Input
                  placeholder="Enter no."
                  type="number"
                  name="plot_number"
                  aria-label="plot_number-input"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-sm-3" aria-label="label">
              <FormGroup>
                <label className="control-label" aria-label="Zip code">
                  Zip code
                  <span className="label-style">*</span>
                </label>
                <Input
                  placeholder="Enter ZIP"
                  name="postal_code"
                  aria-label="postal_code-input"
                  required
                />
              </FormGroup>
            </div>
          </div>
          <div className="row" aria-label="label">
            <div className="col-sm-6">
              <FormGroup>
                <label className="control-label" aria-label="city">
                  City
                  <span className="label-style">*</span>
                </label>
                <Input
                  placeholder="Enter city"
                  name="city"
                  aria-label="city-input"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-sm-6" aria-label="label">
              <FormGroup>
                <label className="control-label" aria-label="country">
                  Country
                  <span className="label-style">*</span>
                </label>
                <Select
                  className="form-control"
                  defaultValue="Canada"
                  name="country"
                  onChange={(e) => setUserCountry(e.target.value)}
                  dispatch={dispatch}
                  aria-label="country-input"
                  data={countries}
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="col-12">
            <AnimatedButton
              disabled={!userCountry || userCountry === "----"}
              aria-label="submit"
            >
              Create User
            </AnimatedButton>
          </div>
        </form>
      </ContentSection>
    </InviteContainer>
  );
};

CreateUser.propTypes = {
  countries: PropTypes.array,
};

export default CreateUser;

// const LabelStyle = styled.span`
//   .label-style {
//     color: #da3451;
//     padding-left: 2px;
//   }
// `;
