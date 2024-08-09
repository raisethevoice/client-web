import { Col, Row } from "antd";
import Feed from "./views/Feed";
import RightSidebar from "./views/RightSidebar";

export default function FeedPage() {
	return (
		<div>
			<Row gutter={[40, 0]}>
				<Col span={18} className="col-span-4">
					<Feed />
				</Col>
				<Col span={6} className=" col-span-2">
					<RightSidebar />
				</Col>
			</Row>
		</div>
	);
}
