import { logRoles } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [

 {src : "/img/1326719.jpg" , matched :false},
 {src : "/img/bg.jpg" , matched :false},
 {src : "/img/help.png" , matched :false},
 {src : "/img/hamza.jpg" , matched :false},
 {src : "/img/Sans titre-2.png" , matched :false},
 {src : "/img/th (1).jpeg" , matched :false}
]

function App() 
{

  const [cards ,setCards] = useState([])
  const [attempts , setattempts] = useState(0)
  const [ChoiceOne , SetChoiceOne] = useState(null)
  const [ChoiceTwo , SetChoiceTwo] = useState(null)
  const [match , Setmatched] = useState(0)
  const attemp = 10
  const matchs = 6


  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort( () => Math.random() -0.5)
    .map((card) => ({...card , id: Math.random()}))
    setCards(shuffleCards)
    setattempts(0)
    console.log(shuffleCards)   
  }
  
  const check = () =>
  { var a = true
    
    if ((attempts === attemp) || ((attemp - attempts) < (matchs-match))) 
    {

      
      shuffleCards()
      alert("you lose")}
    else if (match === 6)
    {
      shuffleCards() 
      alert("win")
      Setmatched(0)
    }  
    }
  
  
  const handleChoice = (card) => 
  {
    ChoiceOne ?  SetChoiceTwo(card) : SetChoiceOne(card)
    
  }
  const resetAtt = () =>
  {
    SetChoiceOne(null)
    SetChoiceTwo(null)
    setattempts(prevTurns => prevTurns +1)
  }

  useEffect( () => {
    if (ChoiceOne && ChoiceTwo){
          if (ChoiceOne.src === ChoiceTwo.src)

          {
            setCards(prevCards => {

              return prevCards.map(card => {
                if (card.src === ChoiceOne.src)
                { 
                  return {...card , matched: true}
                  
                }
                else
                {
                  return card 
                }
              })
            })
            resetAtt()
            Setmatched (prev => prev +1)
            
            
          }
          
  else
          {
           
           setTimeout ( ()=> resetAtt() , 1000)
           
          }

    }
  }  , [ChoiceOne,ChoiceTwo])
 check()
  
 console.log(match)
  return (
    
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h3 id='attempts'>Attempts: {attempts}</h3>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id}
           card = {card}
          handleChoice = {handleChoice}
          flipped = {card === ChoiceOne || card === ChoiceTwo || card.matched}
          />


        )
          )}
      </div>
      
      
    
    </div>
  );
}

export default App;
