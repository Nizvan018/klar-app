import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

interface Props {
    action: Function
    data: any[]
    defaultValue: string | number
}

export default function SelectInput({ action, data, defaultValue }: Props) {
    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                action(selectedItem, index);
                // setType({ nombre: selectedItem, valor: index });
                // setValue('clabe_tarjeta', '', { shouldValidate: true });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
            defaultValue={defaultValue}
            buttonStyle={styles.button_style}
            buttonTextStyle={styles.button_text_style}
            renderDropdownIcon={() => (
                <MaterialIcons name="keyboard-arrow-down" size={24} />
            )}
            dropdownStyle={styles.dropdown_style}
        />
    )
}

const styles = StyleSheet.create({
    button_style: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: 'transparent'
    },
    button_text_style: {
        fontSize: 12,
        textAlign: 'left'
    },
    dropdown_style: {
        borderWidth: 0,
        borderRadius: 8
    }
});