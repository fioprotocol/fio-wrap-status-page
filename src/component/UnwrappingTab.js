import React from 'react';  
import { Collapse, Button } from 'antd';
function UnwrappingTabs() {
  const { Panel } = Collapse;
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
    `;
    const  buttonClick = (e) => {
        console.log("button clicked");
    };
  return (
    <div>
        <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="This is panel header 1" key="1" extra={
                <div>
                    <Button size="small" onClick={buttonClick}>
                        Success
                    </Button>
                </div>
            }>
            <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
            </Panel>
        </Collapse>
    </div>
  );
}

export default UnwrappingTabs;

