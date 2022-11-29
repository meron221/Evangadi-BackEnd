const pool = require("../../config/database");

module.exports = {
	//data comes form the user controller
	newAnswer: (data, callback) => {
		//inserting data to registration table
		// pool.query(
		// 	`SELECT question.question_id FROM answer LEFT JOIN question ON answer.question_id = question.question_id WHERE` 

		// );
		pool.query(
			`INSERT INTO answer(answer,user_id, question_id, time )VALUES(?,?,?,?)`,
			// ? it is hold  it help sql injections
			[data.body.answer, data.id, data.body.questionId, new Date()],
			(err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null, result);
			}
		);
	},
	getAnswerByQuestId: (questionId, callback) => {
		//getting the question list by question_id
		pool.query(
			`SELECT answer.answer_id, answer.question_id, answer.user_id, registration.user_name, answer.answer, answer.time FROM answer LEFT OUTER JOIN registration ON registration.user_id = answer.user_id WHERE answer.question_id = ?`,
			[questionId],
			(err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null, result);
			}
		);
	},
};
