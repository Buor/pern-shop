import React from 'react'
import styles from './productNavigation.module.scss'
import { TProductPageSection } from '../ProductPage'

interface IProps {
    currentSection: TProductPageSection,
    setCurrentSection: Function
}

export const ProductNavigation: React.FC<IProps> = ({currentSection,setCurrentSection}) => {
    return (
        <nav className={styles.navWrapper}>
            <div className={styles.navigation + ' container'}>
                <button className={currentSection === 'All about Product' ? styles.active : ''}
                        onClick={() => setCurrentSection('All about Product')}>Все о товаре
                </button>
                <button className={currentSection === 'Stats' ? styles.active : ''}
                        onClick={() => setCurrentSection('Stats')}>Характеристики
                </button>
            </div>
        </nav>
    )
}