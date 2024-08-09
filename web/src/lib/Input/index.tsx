import { ChangeEvent } from "react";

type InputProps = {
	type?: string;
	name?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	label?: string;
};

export default function Input({ label, ...props }: InputProps) {
	return (
		<div>
			{label ? (
				<label className="block mb-2 text-sm font-medium text-gray-900">
					{label}
				</label>
			) : null}

			<input
				type="text"
				className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
				required
				{...props}
			/>
		</div>
	);
}
