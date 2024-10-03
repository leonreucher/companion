import React from 'react'
import { DropdownChoice, DropdownChoiceId } from '@companion-module/base'
import { ResetButton, UserConfigProps } from './Common.js'
import { UserConfigModel } from '@companion-app/shared/Model/UserConfigModel.js'
import { DropdownInputField } from '../../Components/DropdownInputField.js'
import { observer } from 'mobx-react-lite'

interface UserConfigDropDownRowProps {
	userConfig: UserConfigProps
	label: string | React.ReactNode
	field: keyof UserConfigModel
	choices: DropdownChoice[] | Record<string, DropdownChoice>
	multiple?: boolean 
}

export const UserConfigDropDownRow = observer(function UserConfigDropDownRow({
	userConfig,
	label,
	field,
	choices,
	multiple = false
}: UserConfigDropDownRowProps) {
	// Handle different types for `userConfig.config[field]`
	const fieldValue = userConfig.config[field]

	let dropdownValue: DropdownChoiceId | undefined
	dropdownValue = fieldValue as DropdownChoiceId

	return (
		<tr>
			<td>{label}</td>
			<td>
				<DropdownInputField
					value={dropdownValue}
					choices={choices}
					multiple={multiple}
					setValue={(rawValue) => {
						userConfig.setValue(field, rawValue)
					}}
				/>
			</td>
			<td>
				<ResetButton userConfig={userConfig} field={field} />
			</td>
		</tr>
	)
})
