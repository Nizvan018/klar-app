import { View, Text, StyleSheet, KeyboardType } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import type { Control, RegisterOptions } from 'react-hook-form';

interface Props {
	control?: Control<any>
	name: string,
	label?: string,
	placeholder?: string,
	secureTextEntry?: boolean,
	rules?: RegisterOptions,
	mode?: 'flat' | 'outlined'
	outlineColor?: string
	activeOutlineColor?: string
	keyboardType?: KeyboardType
}

export default function CustomTextInput({ control, name, rules = {}, label, secureTextEntry, mode, outlineColor, activeOutlineColor, placeholder, keyboardType = 'default' }: Props) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<View>
					<TextInput
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						label={label}
						placeholder={placeholder}
						secureTextEntry={secureTextEntry}
						mode={mode}
						style={styles.input}
						outlineStyle={styles.outline}
						outlineColor={error ? '#e77' : outlineColor}
						activeOutlineColor={error ? '#e77' : activeOutlineColor}
						cursorColor='black'
						keyboardType={keyboardType}
					/>
					{error && (
						<Text style={styles.text}>{error.message}</Text>
					)}
				</View>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontSize: 13,
		backgroundColor: 'transparent'
	},
	outline: {
		borderRadius: 10
	},
	text: {
		marginTop: 2,
		color: '#f66'
	}
});