export const generateEmailText = (resetURL) => `
	Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
	If you didn't forget your password, please ignore this email
`;
	
export const generateEmailHTML = (resetURL) => `
	<div
		style='
			display:flex;
			flex-direction:column;
			align-items:center;
			justify-content:center;
			width:100%;
			height:100%;
			background:black;
		'
	>
		<h1
			style='
				text-align:center;
				color:white;
			'
		>
			Forgot your password?
		</h1>
		<span
			style='
				color:white;
			'
		>
			Click
			&nbsp;
			<a
				href='${resetURL}'
				style='
					color:aqua;
					fontWeight:bold;
				'
			>here</a>
			&nbsp;
			to reset your password
		</span>
	</div>
`;