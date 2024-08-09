import Spin from "lib/Spin";
import { MouseEvent, ReactElement } from "react";
import { cn } from "utils";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
	suffix?: ReactElement;
	loading?: boolean;
};

export default function Button({
	children,
	suffix,
	className,
	loading,
	...props
}: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				"text-white bg-black hover:bg-[#222] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none inline-flex justify-center items-center gap-2",
				className
			)}
			{...props}
		>
			{children}
			{suffix}
			{loading && <Spin spinning={true} className="text-white" />}
		</button>
	);
}
