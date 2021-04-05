/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as passwordsActions } from "../../redux/ducks/passwords";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import PasswordsShow from "./PasswordsShow";

function PasswordsDisplay({ passwordsState, passwordsActions }) {
  const [allPasswords, setAllPasswords] = useState([]);
  const [form, setForme] = useState({
    minLength: 8,
    specialCharacters: 2,
    numbers: 2,
    passwords: 10,
  });
  const [invalidForm, setInvalidForme] = useState({
    minLength: false,
    specialCharacters: false,
    numbers: false,
    passwords: false,
  });
  const history = useHistory();

  useEffect(() => {
    if (passwordsState.isLoading) {
      setAllPasswords([]);
    } else if (passwordsState.passwords.length > 0) {
      setAllPasswords(passwordsState.passwords);
    }
  }, [passwordsState]);

  const handleInput = (input) => {
    let { name, value } = input.target;
    value = value.replace(/\D/g, "");
    if (value === "") {
      value = 0;
    }
    value = parseInt(value);
    setForme({ ...form, [name]: value });
  };

  const checkFormValid = () => {
    setInvalidForme({
      minLength: false,
      specialCharacters: false,
      numbers: false,
      passwords: false,
    });
    const { minLength, specialCharacters, numbers, passwords } = form;

    if (
      minLength < 8 ||
      minLength > 99 ||
      minLength < numbers + specialCharacters
    ) {
      setInvalidForme({ ...invalidForm, minLength: true });
    }
    if (specialCharacters < 0 || specialCharacters > 99) {
      setInvalidForme({ ...invalidForm, specialCharacters: true });
    }
    if (numbers < 0 || numbers > 99) {
      setInvalidForme({ ...invalidForm, numbers: true });
    }
    if (numbers + specialCharacters > 99) {
      setInvalidForme({
        ...invalidForm,
        numbers: true,
        specialCharacters: true,
      });
    }

    if (passwords < 10 || passwords > 1000) {
      setInvalidForme({ ...invalidForm, passwords: true });
    }

    generatePasswords();
  };

  const generatePasswords = () => {
    const { minLength, specialCharacters, numbers, passwords } = invalidForm;
    if (!minLength && !specialCharacters && !numbers && !passwords) {
      passwordsActions.getPasswords(form);
    }
  };

  return (
    <div className="passwordsDisplay p-px-5">
      <div>
        <h2>To generate passwords just fill the form below:</h2>
        <h4 className="p-mt-6">
          all fields are mandatory and should be numbers, each field write a
          number of:
        </h4>
        <div className="p-fluid p-formgrid p-grid p-mt-1">
          <div className="p-field p-xs-12 p-sm-12 p-md-6 p-lg-3">
            <Tooltip target=".tooltip-passwords" position="bottom">
              <p className="p-mt-2">How many passwords will be generated?</p>
              <ul
                className="p-pl-2 p-ml-2 p-mt-0"
                style={{ lineHeight: "1.5" }}
              >
                <li>At least 10</li>
                <li>Not more than 1000</li>
              </ul>
            </Tooltip>
            <label>Passwords</label>
            <InputText
              value={form.passwords}
              onChange={handleInput}
              className={`tooltip-passwords ${
                invalidForm.passwords && "p-invalid"
              }`}
              name="passwords"
              type="text"
            />
          </div>

          <div className="p-field p-sm-12 p-md-6 p-lg-3">
            <Tooltip target=".tooltip-minLength" position="bottom">
              <p className="p-mt-2">
                What is the minimum length for each password?
              </p>
              <ul
                className="p-pl-2 p-ml-2 p-mt-0"
                style={{ lineHeight: "1.5" }}
              >
                <li>At least 8</li>
                <li>Not more than 99</li>
                <li>Not less than number of (Special characters + Numbers)</li>
              </ul>
            </Tooltip>
            <label>Minimum length</label>
            <InputText
              value={form.minLength}
              onChange={handleInput}
              className={`tooltip-minLength ${
                invalidForm.minLength && "p-invalid"
              }`}
              name="minLength"
              type="text"
            />
          </div>

          <div className="p-field p-sm-12 p-md-6 p-lg-3">
            <Tooltip target=".tooltip-specialCharacters" position="bottom">
              <p className="p-mt-2">
                How many special characters will be in each password?
              </p>
              <ul
                className="p-pl-2 p-ml-2 p-mt-0"
                style={{ lineHeight: "1.5" }}
              >
                <li>0 for no one</li>
                <li>At least 0</li>
                <li>Not more than 99</li>
                <li>
                  number of (Special characters + Numbers) not more than 99
                </li>
              </ul>
            </Tooltip>
            <label>Special characters</label>
            <InputText
              value={form.specialCharacters}
              className={`tooltip-specialCharacters ${
                invalidForm.specialCharacters && "p-invalid"
              }`}
              onChange={handleInput}
              name="specialCharacters"
              type="text"
            />
          </div>

          <div className="p-field p-sm-12 p-md-6 p-lg-3">
            <Tooltip target=".tooltip-numbers" position="bottom">
              <p className="p-mt-2">
                How many numbers will be in each password?
              </p>
              <ul
                className="p-pl-2 p-ml-2 p-mt-0"
                style={{ lineHeight: "1.5" }}
              >
                <li>0 for no one</li>
                <li>At least 0</li>
                <li>Not more than 99</li>
                <li>
                  number of (Special characters + Numbers) not more than 99
                </li>
              </ul>
            </Tooltip>
            <label>Numbers</label>
            <InputText
              value={form.numbers}
              className={`tooltip-numbers ${
                invalidForm.numbers && "p-invalid"
              }`}
              onChange={handleInput}
              name="numbers"
              type="text"
            />
          </div>
          <Button
            label="Generate"
            className="p-button-rounded p-button-success p-m-2"
            onClick={checkFormValid}
          />
          <Button
            label="Go Back"
            className="p-button-rounded p-button-danger p-m-2"
            onClick={() => {
              history.push("/");
              passwordsActions.deletePasswords();
            }}
          />
        </div>
      </div>
      {allPasswords.length > 0 && <PasswordsShow passwords={allPasswords} />}
    </div>
  );
}

PasswordsDisplay.propTypes = {
  passwordsState: PropTypes.object,
  passwordsActions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  passwordsState: state.passwordsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  passwordsActions: bindActionCreators(passwordsActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PasswordsDisplay);
