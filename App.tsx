import Navigation from '@/navigation/Navigation';
import { UserProvider } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

export default function App() {
	return (
		<>
			<UserProvider>
				<Navigation />
			</UserProvider>
			<Toast />
		</>
	);
}