import { Col, Row } from "antd";
import Prompts from "components/prompts";
import { Outlet } from "react-router-dom";
import Sidebar from "./views/Sidebar";

export default function AppLayout() {
	return (
		<>
			<div className="max-w-7xl mx-auto mt-6">
				<Row gutter={[32, 0]}>
					<Col span={4}>
						<Sidebar />
					</Col>
					<Col span={20}>
						<Outlet />
					</Col>
				</Row>
			</div>
			<Prompts />
		</>
	);
}
