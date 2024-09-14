import * as React from 'react';
import './style.css'

interface NavigationsArray {
    menuName: string,
    key: number
}
interface Menu {
    itemsMenu: NavigationsArray[],
    logo: JSX.Element,
    username: string
}

export default function MenuNavigationComponent({itemsMenu, logo, username}: Menu){
    return (
        <nav className='nav-component-menu'>
            <ul className='list-menu'>
                <li>{logo}</li>
                <li>{username}</li>
                {itemsMenu.map((item: NavigationsArray) => (
                    <li key={item.key}>
                        {item.menuName}
                    </li>
                ))}
            </ul>
        </nav>
    )
}