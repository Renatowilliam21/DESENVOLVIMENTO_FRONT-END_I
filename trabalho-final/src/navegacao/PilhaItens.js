import { createStackNavigator } from '@react-navigation/stack';

import { cores } from '../estilos/tema';
import ListaItens from '../telas/ListaItens';
import DetalheItem from '../telas/DetalheItem';
import FormularioItem from '../telas/FormularioItem';

const Stack = createStackNavigator();

export default function PilhaItens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.branco,
        cardStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Stack.Screen name="ListaItens" component={ListaItens} options={{ title: 'Itens' }} />
      <Stack.Screen name="DetalheItem" component={DetalheItem} options={{ title: 'Detalhes' }} />
      <Stack.Screen name="FormularioItem" component={FormularioItem} options={{ title: 'Novo item' }} />
    </Stack.Navigator>
  );
}
