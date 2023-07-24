import React from 'react'
// import ListGroup from 'react-bootstrap/ListGroup';
import './todo.css'
import { useState, useRef, useEffect } from 'react'
import {MdDelete} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import {IoMdDoneAll} from 'react-icons/io'


function Todo() {
    const [input, setInput] = useState('')
    const [data, setData] = useState([]) // store data
    const [editId, setEditId]=useState()     // new state defined inorder to find pass new id

    // const addTodo = () => {
    //     setData([...data, input  ])                        
    //        console.log(data);
    //       setInput('')
      
    // }    //empty array laku data ennai empty arraylaku update chaiya
    // first user enter chaitha datayum , then user ippo enter chaitha datayum orumichu annu arraylaku push chaiyunnae

    const addTodo = () => {
      if(input !== ''){   // input field nthakilum data indakil matram add avan pattullu
        setData([...data, {list:input, id: Date.now(), status : false}  ])                        
        console.log(data);
       setInput('')
      } 
      if(editId){
        const editTodo = data.find((input)=>input.id==editId)
        const updateTodo = data.map((to)=>to.id===editTodo.id
        ? (to = {id: to.id, list : input})
        : (to ={id : to.id, list : to.list}))
        setData(updateTodo)
        setEditId(0);
        setInput('')
      }
    }  





    const handleSubmit = (e) =>{
      e.preventDefault();
    }

    

const inputRef = useRef('null')  
// useRef, is used to make the input field to be focused. Useref is mainly used to access the dom directly

useEffect(()=>{
  inputRef.current.focus()
  console.log(inputRef.current);
},[])
// []- this is called dependencies, once we use dependency array it will use only at initial array.

const onDelete = (id)=>{
setData(data.filter((to)=> to.id !== id))
}
const onComplete =(id)=>{   
let complete = data.map((list)=>{     //oru variable create chaithu, then create map function to  check the iteration in the array
  if(list.id === id)  // list nte ullil ulla id === nammalu pass chaitha id anno nn check chaiyuunu.
  return({...list, status : !list.status}) //agana kittiya id return chaithu, and aa kittiya id nammalu spread chaiyunnnu, then we have to change the status
  // ie, nammalu default ayaittu onclickil set akiya status falsse nna true akanam.
})
setData(complete) //then here we are going to update that array
}

const onEdit=(id)=>{
 let editTodo=data.find((to)=> to.id === id) // id check chaiyunnu
 console.log('edit id' + editTodo.list)
 setInput(editTodo.list)                    // input field ulla data ie, list ulla aa specified data update chaiyan aa fieldil vilikunna
 setEditId(editTodo.id)
}

  return (
    <div className='container'>
        <h2>Todo App</h2>
      <form className='form-group' onSubmit={handleSubmit}>
<input type='text' value={input} ref={inputRef}placeholder='Enter your todo' className='form-control' onChange={(e)=>setInput(e.target.value)}></input>
{/* ref is an react property. athu useref athu input fieldil annu use chaiyandai 
aa input field ennai access chaiyan vendi annu ref property use chaiuyunnae  */}

{/* <button onClick={addTodo}> ADD</button> */}
<button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button> 
{/* editid lu nthakilum undakil ee button edit kanikum allakil add kanikum */}
      </form>
      <div className='list'>
     
   {
    data.map((to)=>(
      <li className='list-items'>
       {/* <div className='list-items-list'>{to}</div>  */}
       <div className='list-items-list' id={to.status ? 'item' : ''}>{to.list}</div> 
      <span>
        <IoMdDoneAll 
        className='list-item-icons'
         id='complete' 
         title='Complete'
         onClick={()=>onComplete(to.id)}/>
        <FiEdit 
        className='list-item-icons'
         id='edit' 
         title='Edit'
         onClick={()=>onEdit(to.id)}/>
        <MdDelete
         className='list-item-icons'
          id='delete' 
          title='Delete'
          onClick={()=>onDelete(to.id)}
          />
        </span></li>
    ))
   }
      </div>
    </div>
  )
}

export default Todo
