const pool = require("../../config/database");



module.exports = {
	//data comes form the user controller
	askQuestion: (data, callback) => {
		//inserting data to question table
		pool.query(
			`INSERT INTO question(question_title, question_description,user_id,time)VALUES(?,?,?,?)`,
			[
				// ? it is hold  it help sql injections
				data.body.questionTitle,
				data.body.questionDescription,
				// data.questionCodeBlock,
				// data.tags,
				// data.postId,
				data.id,
				new Date(),
			],
			(err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null, result);
			}
		);
	},
	getQuestions: (callback) => {
		//getting the question list by user_id
		pool.query(
			`SELECT question.question_id, registration.user_id, registration.user_name, question.question_title, question.question_description, question.time  FROM question LEFT OUTER JOIN registration ON question.user_id = registration.user_id  order by question.time desc`,
			(err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null, result);
			}
		);
	},
	getquestionbyid: (questionId, callback) => {
		//getting the question list by user_id
		pool.query(
			`SELECT question.question_id, registration.user_id, registration.user_name, question.question_title, question.question_description, question.time  FROM question LEFT OUTER JOIN registration ON question.user_id = registration.user_id where question_id = ?`,
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
