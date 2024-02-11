import Navigation from '@/navigation/Navigation';
import { UserProvider } from '@/context/AuthContext';

export default function App() {
	return (
		<UserProvider>
			<Navigation />
		</UserProvider>
	);
}