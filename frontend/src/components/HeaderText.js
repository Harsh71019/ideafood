import React from 'react'

const HeaderText = ({headertext}) => {
    return (
        <div className="d-flex justify-content-center my-3">
            <p className="header-text-style text-uppercase">{headertext}</p>
        </div>
    )
}

export default HeaderText
