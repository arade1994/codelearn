import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import Ionicons from 'react-native-vector-icons'

const MenuButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color='white' />
    )
}

export default MenuButton;