// import { useDispatch } from "react-redux";
import { Tabs } from 'antd';
import WrappingTabs from "../component/WrappingTab";
import UnwrappingTabs from "../component/UnwrappingTab";

function Wrapping() {
  // const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const  callback = (key) => {
    console.log(key);
  };
  return (
    <div>
      <h1>Transaction Wrapping Management</h1>
      <h2>View wrapping and unwrapping status</h2>
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Wrapping" key="1">
                    <WrappingTabs />
                </TabPane>
                <TabPane tab="Unwrapping" key="2">
                    <UnwrappingTabs />
                </TabPane>
            </Tabs>
        </div>
    </div>
  );
}

export default Wrapping;