import  React from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './paginas/Login'
import Locais from './paginas/Locais'
import Reserva from './paginas/Reserva'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login, 
        Locais, 
        Reserva,})
)

export default Routes;