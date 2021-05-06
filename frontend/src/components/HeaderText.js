import React from 'react'

const HeaderText = ({headertext}) => {
    return (
        <div className="d-flex justify-content-center my-3">
            <h3 className="header-text-style text-uppercase headingstyles">{headertext}</h3>
        </div>
    )
}

export default HeaderText
