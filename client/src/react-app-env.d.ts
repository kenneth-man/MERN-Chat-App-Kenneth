/* eslint-disable @typescript-eslint/no-explicit-any */
// type definitions are needed by TypeScript to know how to handle file extensions it doesn't recognize ootb
// https://stackoverflow.com/questions/54121536/typescript-module-svg-has-no-exported-member-reactcomponent
declare module '*.svg' {
	import React = require('react');

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare module '*.png' {
	const value: any;
	export default value;
}

declare module '*.jpg' {
	const value: any;
	export default value;
}

declare module '*.jpeg' {
	const value: any;
	export default value;
}

declare module '*.gif' {
	const value: any;
	export default value;
}

// type definition to use process.env variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_API_KEY: string;
		}
	}
}
