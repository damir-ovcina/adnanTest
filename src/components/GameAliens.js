import { assertPipelineTopicExpression } from '@babel/types'
import { useState, useEffect } from 'react'
import { Divider } from 'semantic-ui-react'
import Invader1 from '../assets/aliens/invader1.png'
import Invader2 from '../assets/aliens/invader2.png'
import Invader3 from '../assets/aliens/invader3.png'
import Invader4 from '../assets/aliens/invader4.png'
import Invader5 from '../assets/aliens/invader5.png'
import '../styles/game.css'

const Aliens = ({index}) => {

const [rowNum, setRowNum] = useState(4)
const [invaders, setInvaders] = useState([])
const [x, setX] = useState("")

useEffect(() => {
  initInvadersArray()
}, [])

const initInvadersArray = () => {
  let div = []
  let i =+ 1
 for(let row=0;row<=4;row++){
     let cols = []
     let rows = []
         for(let col=0; col<11;col++){
               if(row === 0){
                 cols[col] = <img src={Invader1} className="invader" style={{marginRight:"1.5%"}} key={i++}/>
                } else if(row === 1 || row ===5 || row ===9){
                 cols[col] = <img src={Invader2} className="invader" style={{marginRight:"1.5%"}}  key={i++}/>
               }else if(row === 2 || row ===6 || row ===10){
                 cols[col] = <img src={Invader3} className="invader" style={{marginRight:"1.5%"}}  key={i++}/>
               }else if(row === 3 || row ===7 || row ===11){
                 cols[col] = <img src={Invader4} className="invader" style={{marginRight:"1.5%"}} key={i++}/>
               }else if(row === 4 || row ===8 || row ===12){
                 cols[col] = <img src={Invader5} className="invader" style={{marginRight:"1.5%"}} key={i++}/>
               }  
               rows[row] = <div>{cols}</div>
               
                    
         }   
         div.push(rows)
 }
       
         setInvaders([...div])    
} 

   return(
        <div className="aliensContainer" style={{width:"100%",position:"fixed"}} id="aliens">
            {

                invaders.map(invader => {
                    return invader 
                })
                
                
            }
        </div>
    )
}
export default Aliens;