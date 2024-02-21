import React from 'react';
import { Online, Offline } from 'react-detect-offline';

function Header() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
            <h1>Mi Blog</h1>
            <div style={{ marginLeft: '2rem' }}>
                <Online>
                  Estás en línea
                  <i style={{ color: 'green', marginLeft: 10}} class="fas fa-signal"></i>
                </Online>
                <Offline>
                  Estás fuera de línea
                  <i style={{ color: 'red', marginLeft: 10}} class="fas fa-signal"></i>
                </Offline>
            </div>
        </div>
    );
}

export default Header;