import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Dialog } from 'primereact/dialog'

function Spinner({ passwordsState }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (
      passwordsState.isLoading
    ) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [passwordsState])

  return (
    <Dialog
      className="modal-spinner"
      visible={visible}
      modal={true}
      focusOnShow={false}
      showHeader={false}
      onHide={() => setVisible(false)}
    >
      <ProgressSpinner />
    </Dialog>
  )
}

Spinner.propTypes = {
  passwordsState: PropTypes.object
}

const mapStateToProps = (state) => ({
  passwordsState: state.passwordsReducer
})

export default connect(mapStateToProps, null)(Spinner)
