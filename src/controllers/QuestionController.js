const Database = require('../db/config');

module.exports = {
  async index(req, res) {
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    /* --- Verificar se a senha confere -----*/ 
    const db = await Database();

    const getRoom = await db.get(`SELECT * 
                                  FROM rooms 
                                  WHERE id = ${roomId}
                                `);
 
    if (getRoom.pass === password ) {

      if (action == 'delete' ){

        await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
      
      }else if (action == 'check') {

        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
      
      }
      res.redirect(`/room/${roomId}`)

    }else {
      res.render('passincorrect', {roomId: roomId})
    }

    db.close();
  },

  async create(req, res) {
    const db = await Database();

    const question = req.body.question;
    const roomId = req.params.room;

    await db.run(`INSERT INTO questions (
      title,
      read,
      room
    ) VALUES (
       "${question}",
       0,
       ${roomId}       
       )`)

    await db.close();

    res.redirect(`/room/${roomId}`)
  }
}