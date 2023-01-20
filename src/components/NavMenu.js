import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FadeMenu() {
    const [selectmenu, setSelectmenu] = useState(0);

    const initPage = (id) => {
        setSelectmenu(() => {
            return id
        })
    }
    useEffect(() => {
        let idx = JSON.parse(localStorage.getItem('pIndex'))
        setSelectmenu(()=> idx );
    }, [])


    const activePage = (id) => {
        initPage(id)
        localStorage.setItem('pIndex', id)
    }

    return (
        <div className='navContainer'>
            <ul className='menu' >
                <li><Link to="/" onClick={() => activePage(0)} className={selectmenu === 0 ? 'oce abdi' : 'oce' }>Home</Link></li>
                <li><Link to="portfolio" onClick={() => activePage(1)} className={selectmenu === 1 ? 'oce abdi' : 'oce'}>Portfolio</Link></li>
                <li><Link to='blog' onClick={() => activePage(2)} className={selectmenu === 2 ? 'oce abdi' : 'oce'}>Blog</Link></li>
            </ul>
        </div>
    );
}
