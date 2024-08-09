import { ChangeEvent } from "react";

type TextAreaProps = {
	name?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	rows?: number;
	cols?: number;
	label?: string;
};

export default function TextArea({ label, ...props }: TextAreaProps) {
	return (
		<div>
			{label ? (
				<label className="block mb-2 text-sm font-medium text-gray-900">
					{label}
				</label>
			) : null}
			<textarea
				className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-gray-900 focus:border-gray-900"
				rows={5}
				{...props}
			></textarea>
		</div>
	);
}
