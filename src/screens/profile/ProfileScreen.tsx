import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';
import { useUser } from '@/context/AuthContext';
import Card from '@/components/Card';
import { AntDesign, MaterialIcons, FontAwesome6, Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
	const { account } = useUser();

	return (
		<ScrollView style={styles.container} contentContainerStyle={{}}>
			{/* HEADER */}
			<View style={[styles.header, main.flex, main.align_center, main.gap_16]}>
				<Text style={styles.circle}>{account?.name[0]}</Text>
				<Text style={styles.name}>{account?.name}</Text>
			</View>

			<View style={[main.flex, main.flex_row, main.gap_16, { height: '10%' }, main.mt_16]}>
				<View style={[main.flex, main.justify_end, main.p_16, styles.half_card]}>
					<Text style={[main.color_white, main.bold, { fontSize: 16 }]}>Light</Text>
					<Text style={[main.color_white]}>Tu plan</Text>
				</View>

				<View style={[main.flex, main.justify_end, main.p_16, styles.half_card]}>
					<Text style={[main.color_white, main.bold, { fontSize: 16 }]}>Referidos</Text>
					<Text style={[main.color_white]}>Invita amigos</Text>
				</View>
			</View>

			<Card>
				<View style={[main.flex, main.flex_row, main.align_center, main.p_16, main.gap_16]}>
					<AntDesign name='questioncircleo' size={24} color={'black'} />
					<View>
						<Text style={[main.bold, { fontSize: 16 }]}>Ayuda</Text>
						<Text>Habla con un agente o envíanos tu opinión</Text>
					</View>
				</View>
			</Card>

			<View style={[styles.green_card, main.mt_16]}>
				<View style={[main.flex, main.flex_row, main.space_between, main.align_center]}>
					<View style={[main.flex, main.gap_8]}>
						<Text style={main.color_gray}>CLABE Interbancaria</Text>
						<Text>{account?.clabe}</Text>
					</View>
					<TouchableOpacity>
						<MaterialIcons name="content-copy" size={24} />
					</TouchableOpacity>
				</View>
				<View style={[main.flex, main.gap_8]}>
					<Text style={main.color_gray}>Banco Receptor</Text>
					<Text>Klar - Alternativos</Text>
				</View>
			</View>

			<Card>
				<View style={[main.flex, main.p_16, main.gap_16]}>
					<View style={[main.flex, main.flex_row, main.align_center, main.space_between]}>
						<View style={[main.flex, main.flex_row, main.align_center, main.gap_16]}>
							<FontAwesome6 name="money-bills" size={20} color={"black"} />
							<Text style={{ fontSize: 16 }}>Límite de depósito</Text>
						</View>
						<Text style={[main.color_primary, main.bold]}>Ver más</Text>
					</View>
					<View style={[main.flex, main.flex_row, main.space_between, main.mt_8]}>
						<Text><Text style={[main.color_primary, main.bold]}>$0.00</Text> utilizado</Text>
						<Text style={main.color_gray}>$487,486.20 límite</Text>
					</View>
					<View style={styles.progress_bar}></View>
				</View>
			</Card>

			<Card>
				<View style={[main.flex, main.gap_16, main.p_16]}>
					<View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_8]}>
						<AntDesign name='user' size={28} color={'black'} />
						<View>
							<Text style={[main.bold, { fontSize: 16 }]}>Datos personales</Text>
							<Text>Edita tu información</Text>
						</View>
					</View>
					<View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_8]}>
						<Feather name='lock' size={28} color={'black'} />
						<View>
							<Text style={[main.bold, { fontSize: 16 }]}>Seguridad</Text>
							<Text>Establece tus medidas de seguridad</Text>
						</View>
					</View>
					<View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_8]}>
						<FontAwesome6 name='handshake' size={24} color={'black'} />
						<View>
							<Text style={[main.bold, { fontSize: 16 }]}>Privacidad y términos legales</Text>
							<Text>Información legal acerca de Klon</Text>
						</View>
					</View>
					<View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_8]}>
						<MaterialIcons name='logout' size={28} color={'black'} />
						<View>
							<Text style={[main.bold, { fontSize: 16 }]}>Cerrar sesión</Text>
							<Text>No recibirás notificaciones</Text>
						</View>
					</View>
				</View>
			</Card>

			<View style={[main.flex, main.align_center, main.gap_16, { marginTop: 64, paddingBottom: 160 }]}>
				<Text>Información de la App</Text>
				<Text style={main.color_gray}>v1.0</Text>
				<Text style={main.color_primary}>Ver detalles</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},
	header: {
		marginTop: '24%'
	},
	circle: {
		width: 80,
		aspectRatio: 1,
		borderRadius: 100,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 48,
		fontWeight: '700',
		color: 'white',
		backgroundColor: '#222'
	},
	name: {
		fontSize: 24,
		fontWeight: '700'
	},
	half_card: {
		flex: 1,
		height: '100%',
		borderRadius: 16,
		backgroundColor: 'coral'
	},
	green_card: {
		display: 'flex',
		gap: 24,
		padding: 16,
		borderRadius: 16,
		backgroundColor: '#cfdecf'
	},
	progress_bar: {
		width: "100%",
		height: 8,
		borderRadius: 100,
		backgroundColor: 'lightgray'
	}
});
