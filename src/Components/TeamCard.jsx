import React from 'react'
import './TeamComponent.css'
const TeamCard = ({img,name,post}) => {
  return (
    <body>
        <section>
            <div className='container'>
                <div className='card'>
                    <div className='content'>
                        <div className='imgBx'><img src={img} /></div>
                        <div className='contentBx'>
                            <h3>{name}<br/><span className='yele'>{post}</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
    
  )
}

export default TeamCard