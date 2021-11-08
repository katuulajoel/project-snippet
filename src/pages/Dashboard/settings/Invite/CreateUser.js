import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ContentSection } from "../../../../utils/styles";
import { useDispatch } from "react-redux";
import InviteContainer from "./InviteContainer";
import Label from "../../../../components/Label";
import { Input } from "reactstrap";
import CountrySelector from "../../../../components/CountrySelector";
import * as inviteActions from "../../../../redux/actions/InvitesActions";

const CreateUser = (props) => {
  const [countries, setCountries] = useState([...(props.countries || [])]);

  const dispatch = useDispatch();

  useEffect(() => {
    import("../../../../components/countries").then(({ countries }) => {
      setCountries(countries);
    });
  }, []);

  const [user, setUser] = useState({
    email: "",
    source: 3,
    first_name: "",
    last_name: "",
    type: 2,
    company: "",
    street: "",
    plot_number: "",
    city: "",
    postal_code: "",
    country: "",
    vat_number: "",
  });

  const onChangeField = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSave = async (e) => {
    e.preventDefault();

    const { email, first_name, last_name, type, source } = user;
    const data = {
      email,
      first_name,
      last_name,
      type,
      username: email,
      source,
      company: {
        name: user.company,
        street: user.street,
        plot_number: user.plot_number,
        city: user.city,
        postal_code: user.postal_code,
        country: user.country,
        vat_number: user.vat_number,
      },
    };

    inviteActions.createUser({ ...data })();
  };

  return (
    <InviteContainer>
      <ContentSection style={{ paddingTop: "0" }}>
        <form onSubmit={onSave}>
          <Label name="Email Address">
            <Input
              placeholder="eg. bart@tunga.io"
              onChange={onChangeField}
              name="email"
              defaultValue={user.email}
              aria-label="email-input"
              required
            />
          </Label>
          <Label name="First Name">
            <Input
              placeholder="Enter first name"
              onChange={onChangeField}
              name="first_name"
              value={user.first_name}
              aria-label="first_name-input"
              required
            />
          </Label>
          <Label name="Last Name">
            <Input
              placeholder="Enter last name"
              name="last_name"
              onChange={onChangeField}
              value={user.last_name}
              aria-label="last_name-input"
              required
            />
          </Label>
          <Label name="Company name">
            <Input
              placeholder="Enter name of company"
              name="company"
              onChange={onChangeField}
              value={user.company}
              aria-label="company-input"
              required
            />
          </Label>
          <Label name="VAT Number: ">
            <Input
              placeholder="VAT Number"
              name="vat_number"
              onChange={onChangeField}
              value={user.vat_number}
              aria-label="vat_number-input"
              required
            />
          </Label>
          <Label name="Street">
            <Input
              placeholder="Enter street name"
              name="street"
              onChange={onChangeField}
              value={user.street}
              aria-label="street-input"
              required
            />
          </Label>
          <Label name="Number/Plot">
            <Input
              placeholder="Enter no."
              type="number"
              name="plot_number"
              onChange={onChangeField}
              value={user.plot_number}
              aria-label="plot_number-input"
              required
            />
          </Label>
          <Label name="Zip code">
            <Input
              placeholder="Enter ZIP"
              name="postal_code"
              onChange={onChangeField}
              value={user.postal_code}
              aria-label="postal_code-input"
              required
            />
          </Label>
          <Label name="City">
            <Input
              placeholder="Enter city"
              name="city"
              onChange={onChangeField}
              value={user.city}
              aria-label="city-input"
              required
            />
          </Label>
          <Label name="Country">
            <CountrySelector
              className="form-control"
              defaultValue="Canada"
              name="country"
              onChange={onChangeField}
              dispatch={dispatch}
              aria-label="country-input"
              data={countries}
              required
            />
          </Label>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary save"
              disabled={!user.country || user.country === "----"}
              aria-label="submit"
            >
              Create Client
            </button>
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
