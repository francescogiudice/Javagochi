import React from 'react'
import { Typography, Modal } from 'antd';

const { Text } = Typography;

const ModalPopup = (props) => {

    const title = props.title;
    const visible = props.visible;
    const onOk = props.onOk;
    const onCancel = props.onCancel;
    const text = props.text;

    return (

        <Modal
          title={title}
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
        >
            <Text>{text}</Text>
        </Modal>
    )
}

export default ModalPopup;
