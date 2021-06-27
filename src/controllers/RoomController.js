const Database = require('../db/config');

function getRoomId() {
  let roomId = '';
  for (let i = 0; i < 6; i++) {
    roomId += Math.floor(Math.random() * 10).toString();
  }
  return (roomId);
}

module.exports = {

  async create(req, res) {

    const db = await Database();
    let roomId ;
    let isRoom = true;
    const pass = req.body.password;

    while (isRoom) {
      roomId = getRoomId();
      const roomsExistIds = await db.all('SELECT id FROM rooms');
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId);
      if(!isRoom) {
        await db.run(`INSERT INTO rooms  (
          id,
          pass
        ) VALUES (
           ${parseInt(roomId)},
           ${pass}       
           )`)
      }
    }
    await db.close();

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const roomId = req.params.room
   
    const db = await Database();

    const questions = await db.all(`SELECT * 
                                      FROM questions 
                                      WHERE room = ${roomId} AND read = 0`)
    const questionsRead = await db.all(`SELECT * 
                                          FROM questions 
                                          WHERE room = ${roomId} AND read = 1`)
    
    let isNoQuestions;
    
    if (( questions.length == 0 ) && ( questionsRead.length == 0 ) ){
      isNoQuestions = true;
    }

    

    res.render('room' , {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions});

    await db.close();
  },

  async enter(req, res) {
    const db = await Database();
    const roomId = req.body.roomId;

    res.redirect(`/room/${roomId}`)


    await db.close();

  }

}




/*
    let roomId = 0;
    let result = [];
    do {
      roomId = getRoomId();
      result = await db.all(`SELECT id, pass FROM rooms WHERE id = ${roomId}`);
    } while ( result.length > 0);
*/

    
    



