import React, { useState } from "react";
import PropTypes from "prop-types";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as messagesActions } from "../../redux/ducks/statusMessages";
import { clipboardCopy } from "../../helpers/clipboardCopy";

function PasswordsShow({ passwords, messagesActions }) {
  const [allPasswords] = useState(() => {
    if (passwords.length > 0) {
      return passwords;
    } else {
      return [];
    }
  });

  const renderGridItem = (data) => {
    return (
      <div className="p-xs-12 p-sm-12 p-md-6 p-lg-4">
        <div className="product-grid-item card">
          <div className="p-inputgroup">
            <InputText value={data} disabled />
            <Button
              icon="pi pi-copy"
              className="p-button-warning"
              onClick={() => {
                clipboardCopy(data);
                messagesActions.setMessage({
                  status: 200,
                  message: "The password has been copied to the clipboard",
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="passwordsShow p-mb-6">
      <h3 className="p-mt-6">Here are all passwords:</h3>
      <div className="p-shadow-3">
        <DataView
          value={allPasswords}
          layout={"grid"}
          itemTemplate={renderGridItem}
          paginator
          rows={9}
        />
      </div>
    </div>
  );
}

PasswordsShow.propTypes = {
  passwords: PropTypes.array,
  messagesActions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  messagesActions: bindActionCreators(messagesActions, dispatch),
});
export default connect(null, mapDispatchToProps)(PasswordsShow);
