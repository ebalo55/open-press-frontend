import { Button } from "grapesjs";

export const SavingButton: Button = {
	id: "saving",
	active: false,
	label: `
		<div id="saving-btn" style="flex-direction: row; align-items: center; color: white; display: none; font-size: .9rem; margin-right: 1rem; cursor: default">
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				fill="none" 
				viewBox="0 0 24 24"
				style="animation: spin 1s linear infinite; width: 1rem; height: 1rem; margin-right: 0.75rem;"
			>
		      <circle style="opacity: .25" cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="4"></circle>
		      <path style="opacity: .75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		    </svg>
		    <span>Saving</span>
        </div>`,
} as Button & { label: string };
