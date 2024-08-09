import { Spin as AntdSpin, SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spin(props: SpinProps) {
	return (
		<AntdSpin indicator={<LoadingOutlined spin />} size="small" {...props} />
	);
}
