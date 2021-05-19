import './App.css';
import { useState } from 'react'

function App() {

  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState({ text: '', status: false, key: '', date: '', time: '' })

  function update(e) {
    if (toDo == '') {
      alert('You cannot add empty task')
    } else {
      setToDos([...toDos, toDo])
      setToDo({ text: '', status: false, key: '', date: '', time: '' })
    }
  }

  function msToHMS(duration) {
    // 1- Convert to seconds:
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }


  function updateFinshiedTodos(finishedToDo) {

    setToDos(toDos.filter(o => {
      if (finishedToDo.key != o.key) {
        console.log('no match', o, finishedToDo);
        return (o)
      } else {
        o.status = true
        return (o)
      }
    }))

  }




  return (
    <div className="App">
      <center style={{ marginTop: '2%' }}>
        <h2>To do list</h2>
        <div className="page p-3 border bg-white">
          <br></br>
          <input value={toDo.text} onChange={(e) => {

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            setToDo(



              { text: e.target.value, status: false, key: Date.now(), date: date + '/' + month + '/' + year, time: msToHMS(newDate.getTime()) }
            )
          }} className="form-control" placeholder="To do"></input>
          <button onClick={update} className="btn btn-success mt-1">Add to do</button>
          <br></br>
          <br></br>
          <p>Ongoing tasks</p>
          <hr></hr>

          {
            toDos.map((item) => {

              let finished = item.status

              if (!finished) {
                return (

                  <div className="fadeIn task bg-warning text-white p-2 border">
                    <p style={{ fontSize: '12px', color: 'gray', display: 'inline' }}>Started : <br></br> {item.date} <br></br> {item.time}</p>
                    <h4>{item.text}</h4>
                    <button onClick={(e) => {
                      console.log('1');
                      updateFinshiedTodos(item)
                    }} className="btn btn-light">Done</button>

                  </div>)
              }


            })


          }



          <br></br>
          <p>Finished tasks</p>
          <hr></hr>

          {
            toDos.map((item) => {

              let finished = item.status

              if (finished) {
                return (

                  <div className="task bg-success text-white p-2 border">
                    <p style={{ fontSize: '12px', display: 'inline' }}>Started : <br></br> {item.date} <br></br> {item.time}</p>
                    <h4>{item.text}</h4>
                    <button onClick={(e) => {
                      setToDos(toDos.filter(obj => {
                        if (obj.key!=item.key) {
                          return(obj)
                        }
                      }))
                    }} className="btn btn-danger">Remove</button>

                  </div>)
              }


            })


          }
        </div>
      </center>
    </div>
  );
}

export default App;
