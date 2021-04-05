import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Creators as statusMessages } from '../redux/ducks/statusMessages'
import { Toast } from 'primereact/toast'

function ToastMessage({ statusMessage, clearMessage }) {
  const toastMSG = useRef()

  useEffect(() => {
    if (statusMessage.status) {
      switch (statusMessage.status.toString()) {
        case '200': {
          toastMSG.current.show({
            severity: 'success',
            summary: 'Done...',
            detail: statusMessage.message,
            life: 2000
          })
          break
        }
        case '400':
          toastMSG.current.show({
            severity: 'error',
            summary: 'Wrong inputs...',
            detail: statusMessage.message,
            life: 2000
          })
          break
        case '404':
          toastMSG.current.show({
            severity: 'warn',
            summary: 'Server erorr...',
            detail: statusMessage.message,
            life: 2000
          })
          break
        default:
          break
      }
    }
  }, [statusMessage])

  const handleDeleteMessage = () => {
    if (statusMessage.status) {
      clearMessage()
    }
  }

  return (
    <div>
      <Toast ref={toastMSG} onRemove={handleDeleteMessage} />
    </div>
  )
}

ToastMessage.propTypes = {
  statusMessage: PropTypes.object,
  clearMessage: PropTypes.func
}

const mapStateToProps = (state) => ({
  statusMessage: state.statusMessagesReducer
})

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(statusMessages.clearMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage)
