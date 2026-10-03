import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { cores } from '../estilos/tema';
import Inicio from '../telas/Inicio';
import PilhaItens from './PilhaItens';
import Sobre from '../telas/Sobre';

// Navegação principal com Bottom Tabs (requisito 4)
const Tab = createBottomTabNavigator();

const icones = {
  Inicio: ['home', 'home-outline'],
  Itens: ['list', 'list-outline'],
  Sobre: ['information-circle', 'information-circle-outline'],
};

export default function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.branco,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarIcon: ({ focused, color, size }) => {
          const [ativo, inativo] = icones[route.name];
          return <Ionicons name={focused ? ativo : inativo} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} options={{ title: 'Início' }} />
      {/* A aba de itens tem a própria pilha (lista -> detalhe -> formulário) */}
      <Tab.Screen name="Itens" component={PilhaItens} options={{ headerShown: false }} />
      <Tab.Screen name="Sobre" component={Sobre} />
    </Tab.Navigator>
  );
}
