import React from 'react'
import { Typography, Row, Form, Button, Select, Modal } from 'antd';
import JavagochiRace from './JavagochiRace';

const { Text } = Typography;
const Option = Select.Option

const ModalSelectRace = (props) => {

    const visible = props.visible;
    const onOk = props.onOk;
    const onCancel = props.onCancel;
    const handleAction = props.handleAction;
    const handleSelection = props.handleSelection;
    const races = props.races;
    const selectedRaceName = props.selectedRace;
    const selectedRace = races.filter(function (race) { return race.race === selectedRaceName; })[0];

    return (

        <Modal
          visible={visible}
          onOk={handleAction}
          onCancel={onCancel}
          width="70%"
        >
            <div style={{ marginTop: 15 }}>
                <Row>
                    <Form onSubmit={handleAction}>

                        <Select
                          showSearch
                          placeholder="Choose a Javagochi to trade this"
                          defaultActiveFirstOption={false}
                          showArrow={true}
                          style={{ width: 300, marginRight: 15 }}
                          filterOption={true}
                          onChange={handleSelection}
                          notFoundContent={null}
                        >
                            {races.map(race => <Option key={race.race}>{race.race}</Option>)}
                        </Select>

                        <Button type="primary" htmlType="submit">Trade!</Button>
                    </Form>
                </Row>
                <Row>
                    {
                        selectedRace !== undefined ?
                            <JavagochiRace javagochi={selectedRace} />
                        :
                            <div></div>
                    }
                </Row>
            </div>
        </Modal>
    )
}

export default ModalSelectRace;
