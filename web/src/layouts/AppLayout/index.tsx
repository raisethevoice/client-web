import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './views/Sidebar';
import Prompts from 'components/Prompts';
import SidebarMobile from './views/SidebarMobile';

export default function AppLayout() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-6">
        <Row gutter={[32, 0]}>
          <Col xs={0} md={4}>
            <Sidebar />
          </Col>
          <Col xs={24} md={20}>
            <Outlet />
          </Col>
        </Row>
      </div>
      <Prompts />
      <SidebarMobile />
    </>
  );
}
