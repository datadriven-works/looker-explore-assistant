
import React from 'react'
import styles from './style.module.scss'

export interface BardLogoProps {
  search?: boolean | undefined
}

const BardLogo = ({ search }: BardLogoProps) => {
  const SVG = () => (
    <svg width={'30%'} height={'30%'} viewBox="0 -900 900 900" >
      <path fill="url(#b)" className={styles.bard} d="M700-480q0-92-64-156t-156-64q92 0 156-64t64-156q0 92 64 156t156 64q-92 0-156 64t-64 156ZM80-80v-720q0-33 23.5-56.5T160-880h400v80H160v525l46-45h594v-241h80v241q0 33-23.5 56.5T800-240H240L80-80Zm160-320v-80h400v80H240Zm0-120v-80h360v80H240Zm0-120v-80h200v80H240Z"/>
      <linearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='1' x2='1' y2='1'>
         <stop offset='0' stopColor='#1A73E8'>
            <animate attributeName="stopColor"
               values="blue;cyan;peach;yellow;orange;blue" dur="20s" repeatCount="indefinite">
            </animate>
         </stop>
         <stop offset='1' stopColor='#FFDDB7' stopOpacity="0">
            <animate attributeName="stopColor"
               values="peach;orange;red;purple;cyan;blue;green;peach" dur="20s" repeatCount="indefinite">
            </animate>
         </stop>
         <animateTransform attributeName="gradientTransform" type="rotate" values="360 .5 .5;0 .5 .5"
            dur="10s" repeatCount="indefinite" />
      </linearGradient>
    </svg>
  )
  return (
    <>
      {search ? (
        <div
          style={{
            zIndex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <h3 style={{ color: 'rgb(26, 115, 232)' }}>Matching</h3>
          {SVG()}
        </div>
      ) : (
        <>{SVG()}</>
      )}
    </>
  )
}
export default BardLogo