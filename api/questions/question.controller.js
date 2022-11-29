const {
	askQuestion,
	getQuestions,
	getquestionbyid,
} = require("./question.service");

const pool = require("../../config/database");
const { request } = require("express");
require("dotenv").config();

//exporting all methods
module.exports = {
	askQuestion: (req, res) => {
		const { questionTitle, questionDescription } = req.body;
		console.log(req.body);
		//validation
		if (!questionTitle || !questionDescription)
			return res.status(400).json({ msg: "No question have been provided!" });
		if (questionTitle.length > 200)
			return res.status(400).json({
				msg: "Title length can not be greater than 200 characters!",
			});

		askQuestion(req, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ msg: "database connection err" });
			}
			return res.status(200).json({
				msg: "New Questions added successfully",
				data: results,
			});
		});
	},
	getQuestions: (req, res) => {
		getQuestions((err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ msg: "database connection err" });
			}
			if (!results) {
				return res.status(404).json({ msg: "Record not found" });
			} else {
				return res.status(200).json({ data: results });
			}
		});
	},

	getquestionbyid: (req, res) => {
		const {questionId}= req.body
		getquestionbyid(questionId, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ msg: "database connection err" });
			}
			if (!results) {
				return res.status(404).json({ msg: "Record not found" });
			} else {
				return res.status(200).json({ data: results[0] });
			}
		});
	},
};
